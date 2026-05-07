---
title: "Building a self-hosted Matomo with consent-gated tracking on Hetzner — Terraform, Vault, and S3 backups"
slug: self-hosted-matomo-hetzner
date: 2026-05-29
tags: [matomo, gdpr, hetzner, terraform, self-hosting, analytics]
excerpt: "Google Analytics 4 with consent done wrong is a fine; consent done right kills your data. The third option is to host the analytics yourself. Here's how I built a Matomo stack that respects consent and doesn't lose half its data to it."
hero: /images/blog/self-hosted-matomo-hetzner.png
author: Tomislav Ivanović
readingTime: 12
---

## Why Matomo and not GA4

If you run a small site in the EU and you actually obey the cookie rules, GA4 is a sad place to live. The math is simple. You drop a banner. A meaningful share of visitors clicks Reject — somewhere between 40% and 70% in my experience, depending on layout and audience. Everyone who rejected is invisible to your analytics from that moment on. Aggregations on top of the survivors get noisier as the sample shrinks. Every dashboard you stare at is now a partial view of a self-selected slice of your audience, and you paid Google nothing for the privilege of being misled.

The other failure mode is worse. Run GA4 with a "consent" banner that does not actually gate the script — the version most marketing teams ship — and you are running an unlawful tracker. The "without changes everything works" appeal of GA4 only works if you ignore the law. The fines are real, and they have started landing on small companies, not just the obvious giants.

The third option is to host the analytics yourself. The data lives on a server you control, in a database you back up. Consent is still mandatory, the same banner still has to ship, and people still reject. But because you own the stack, you can do things the SaaS analytics vendors will not let you do — anonymize IPs at the network edge before they ever hit the database, set short retention, switch off heatmaps and session replays, run the whole thing without third-party cookies. With those switches flipped honestly, the legal-basis argument for treating some events as legitimate-interest gets stronger, and even the consent-gated portion gives you better-quality data than the GA4 equivalent because nothing is being muddied by ad-network signals.

I picked Matomo. It is the most boring, most documented self-hosted analytics tool, and boring is a feature. This post is how I shipped it: the Terraform that pre-creates the bucket, the Docker stack that runs the app, the Vault paths that hold every secret, and the React glue on the website that makes sure nothing fires until somebody clicks Accept.

## The stack at a glance

Two machines, one Vault, one S3 bucket. The website is a separate concern.

```
                       ┌──────────────────────────────┐
                       │        cloud-lord.com         │
                       │   React + MUI, S3 + CDN       │
                       │   <TrackingProvider/>         │
                       │   <ConsentBanner/>            │
                       └──────────────┬───────────────┘
                                      │ matomo.js (after Accept)
                                      ▼
   ┌──────────────────────────────────────────────────────────┐
   │  Hetzner CX VM      4n4l.cloud-lord.com                  │
   │                                                          │
   │   ┌─────────────┐   ┌──────────────┐   ┌──────────────┐  │
   │   │  matomo     │──▶│  mariadb     │   │ matomo-      │  │
   │   │  :5-apache  │   │  :11         │   │ archiver cron│  │
   │   │  127.0.0.1  │   │  internal    │   │ (sidecar)    │  │
   │   │  :8090      │   │  network     │   │              │  │
   │   └─────────────┘   └──────────────┘   └──────────────┘  │
   │           ▲                                              │
   │           │ host nginx → 127.0.0.1:8090                  │
   │           │ (TLS via Let's Encrypt)                      │
   │                                                          │
   │   /opt/cloud-lord/matomo/scripts/backup.sh (cron 03:30)  │
   └──────────────────────────┬───────────────────────────────┘
                              │ mysqldump → tar → gpg → aws s3 cp
                              ▼
                  ┌────────────────────────────────┐
                  │  s3://cloud-lord-matomo-       │
                  │       backups (eu-central-1)   │
                  │  versioning, SSE-S3, private   │
                  │  Glacier IR @ 30d, delete 180d │
                  └────────────────────────────────┘

   Vault (HashiCorp): secret/cloud-lord/matomo/admin-password
                      secret/cloud-lord/backups/gpg-passphrase-matomo
                      secret/cloud-lord/matomo/db-root
                      secret/cloud-lord/matomo/salt
```

The host is a small Hetzner CX-class VM. The Matomo container talks to MariaDB over an internal Docker network. A third sidecar runs Matomo's archive cron so report aggregation does not fight live traffic. The application listens on `127.0.0.1:8090` only — a plain host nginx proxies in from the public side, terminates TLS, and applies an IP allowlist on the admin paths. That layout is one of the global invariants in my plan: containers expose internal ports, host nginx does the public-facing work. Matomo brings its own Apache, but Apache is invisible from outside the box.

## The Terraform

Backups exist before Matomo exists. The S3 bucket and the IAM that lets the host write to it are declared in Terraform, in the same environment that already runs my transcription pipeline, so the Matomo work just adds two files instead of standing up a new state.

`infrastructure/transcribe-server/s3-backups-matomo.tf`:

```hcl
module "cloud_lord_matomo_backups" {
  source = "../../../../modules/s3/private_versioned_bucket"

  bucket_name        = var.matomo_backup_bucket_name
  region             = "eu-central-1"
  versioning_enabled = true
  sse_algorithm      = "AES256"

  lifecycle_rules = [
    {
      id      = "matomo-glacier-ir"
      enabled = true
      transition = {
        days          = 30
        storage_class = "GLACIER_IR"
      }
      expiration_days = 180
    },
  ]

  tags = {
    Project = "cloud-lord"
    Purpose = "matomo-backups"
  }
}

output "matomo_backup_bucket_arn" {
  value = module.cloud_lord_matomo_backups.bucket_arn
}
```

The variable, declared once in `variables.tf`, gets a concrete value in `terraform.tfvars`:

```hcl
matomo_backup_bucket_name = "cloud-lord-matomo-backups"
```

The host already has an IAM role attached for the transcription pipeline, so the policy work is a one-line widening rather than a new role. Per my own rule, IAM policy changes happen by editing the JSON policy file and `terraform apply` — never via the AWS Console.

`policies/iam_s3_access_policy.json` (excerpt):

```json
{
  "Sid": "ObjectOperations",
  "Effect": "Allow",
  "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
  "Resource": [
    "${transcribe_audio_bucket_arn}/*",
    "${mail_backup_bucket_arn}/*",
    "${matomo_backup_bucket_arn}/*"
  ]
}
```

`iam.tf` is where the templatefile call passes the new bucket ARN into the policy. Plan, review, apply. The diff I want to see is exactly: one new bucket with the lifecycle and SSE settings, the policy gains the new ARN on `ListBucket` and `ObjectOperations` only, and nothing else moves. If `terraform plan` shows a deletion or a widening of an unrelated statement, I bail and re-read what I just wrote.

The repo for the Matomo app itself is also Terraform. GitHub-repos-as-code is a hard rule for me — I do not click "New Repository" anywhere. There is a tiny `terraform/environments/personal/repos/matomo/` environment that calls `modules/github/create_repo/`, the same module my other private repos use, with branch protection, default branch and OIDC settings inherited from the module defaults. `terraform apply` creates the empty remote, and only then do I clone it and start adding files.

## The consent integration

The website is a React + MUI single-page app. There are exactly two pieces wired into it for analytics: a `<TrackingProvider>` that mounts at the app root, and a `<ConsentBanner>` that decides what `_paq` is allowed to do.

`src/providers/TrackingProvider.jsx`:

```jsx
import { useEffect } from 'react';

const TRACKER_URL = 'https://4n4l.cloud-lord.com/matomo.php';
const SCRIPT_URL  = 'https://4n4l.cloud-lord.com/matomo.js';
const SITE_ID     = '1';

const TrackingProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window._paq = window._paq || [];
    window._paq.push(['requireConsent']);
    window._paq.push(['setTrackerUrl', TRACKER_URL]);
    window._paq.push(['setSiteId', SITE_ID]);
    window._paq.push(['trackPageView']);

    try {
      const existing = localStorage.getItem('matomo-consent');
      if (existing === 'accepted')      window._paq.push(['rememberConsentGiven']);
      else if (existing === 'rejected') window._paq.push(['forgetConsentGiven']);
    } catch (_e) { /* ignore storage errors */ }

    const already = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    if (!already) {
      const s = document.createElement('script');
      s.async = true;
      s.src = SCRIPT_URL;
      document.head.appendChild(s);
    }
  }, []);

  return <>{children}</>;
};

export default TrackingProvider;
```

The interesting line is `_paq.push(['requireConsent'])`. That is Matomo's first-class consent helper. With it set, no event is sent to the server until something later pushes `['rememberConsentGiven']`. The consent state is persisted in `localStorage` under `matomo-consent`, so a returning visitor who already chose Accept does not see the banner again, and Matomo immediately re-grants consent on mount.

`src/components/ConsentBanner.jsx` is a slim MUI `<Snackbar>` with two equal-weight buttons — Reject on the left, Accept on the right, same size, same border, same hover. There is a deliberate ~500 ms delay before the banner appears, so it does not fight first paint. The snackbar carries `role="dialog"` and `aria-label="Cookie consent"`, the close icon is wired to Reject so Esc behaves the same way, and the whole thing is keyboard-navigable.

```jsx
const record = (value) => {
  try { localStorage.setItem(STORAGE_KEY, value); } catch (_e) { /* ignore */ }
  if (typeof window !== 'undefined') {
    window._paq = window._paq || [];
    if (value === 'accepted') window._paq.push(['rememberConsentGiven']);
    else                       window._paq.push(['forgetConsentGiven']);
  }
  setOpen(false);
};
```

That is it. Accept pushes `rememberConsentGiven`, Reject pushes `forgetConsentGiven`, both write to `localStorage`, and the snackbar closes. Nothing inside the analytics container fires before one of those two paths runs.

On the server side, the Matomo install is matched to the banner. In the Matomo admin, IP anonymization is set to 2 bytes (a `/16` mask, which is enough to make the IP useless for re-identification while still preserving country-level geo). Do-Not-Track is respected globally. Raw visit logs are deleted after 365 days; aggregated reports are kept for 24 months. Heatmaps, session recordings, and form analytics are turned off — these features collect content the consent banner does not honestly cover, and I am not going to pretend otherwise. Visitor sessions are 30 minutes, not the Matomo default 30 minutes either; double-check yours, the defaults shift between major versions.

## Build-time tracking-slot injection

There is one detail in the website that exists only to keep the deploy boring. `index.html` contains a comment marker:

```html
<head>
  <!-- ...preconnects, fonts... -->
  <!-- MATOMO_TRACKING_SLOT -->
</head>
```

Right now the runtime `<TrackingProvider>` is what actually appends the `matomo.js` script. The slot is the seam for the build-time alternative: the deploy pipeline can swap `<!-- MATOMO_TRACKING_SLOT -->` for a hard-coded `<script>` block at build time, picking the site ID and tracker URL from environment variables. That way the production build hard-codes a `4n4l.cloud-lord.com` site ID `1` snippet, while a staging build can hard-code a different site ID against a different Matomo instance, and neither needs a code change.

The pattern in the GitHub Actions workflow looks like this — three lines in the build step before `npm run build`:

```yaml
- name: Inject Matomo tracking snippet
  run: |
    sed -i "s|<!-- MATOMO_TRACKING_SLOT -->|<script>${MATOMO_SNIPPET}</script>|" index.html
  env:
    MATOMO_SNIPPET: ${{ vars.MATOMO_SNIPPET }}
```

Why bother, when the runtime provider already does the same thing? Two reasons. First, an inline snippet in the HTML head fires before the React bundle parses, which is the right order if you ever need to count visitors who bounced before the JS loaded. Second, the inline path means the analytics call is not coupled to the `requireConsent` queue being pushed before the script tag is added — both are queued into `_paq` regardless of order, which is the whole point of Matomo's command-queue design. Either path is honest, but the inline path is more resilient to a future refactor of the React app.

Hard-coding the snippet directly into `index.html` would work for a single environment. The slot pattern works for any number of environments without forking the file.

## S3-encrypted backups

The backup script lives in the Matomo repo at `scripts/backup.sh`. It is plain Bash, idempotent, and the order is non-negotiable: dump, tar, encrypt, then upload.

```bash
#!/usr/bin/env bash
set -euo pipefail

DATE=$(date -u +%Y/%m/%d)
WORKDIR=$(mktemp -d)
trap 'rm -rf "$WORKDIR"' EXIT

DB_DUMP="$WORKDIR/matomo-db.sql"
TARBALL="$WORKDIR/matomo-$(date -u +%Y%m%d-%H%M%S).tar"
ENCRYPTED="$TARBALL.gpg"

#1. Dump the live database from inside the running container.
docker exec matomo-mariadb \
  mysqldump --single-transaction --routines --triggers \
    -uroot -p"$(vault kv get -field=password secret/cloud-lord/matomo/db-root)" \
    matomo > "$DB_DUMP"

#2. Tar the dump together with the matomo_web_data volume contents.
tar -cf "$TARBALL" \
  -C "$WORKDIR" matomo-db.sql \
  -C /var/lib/docker/volumes/matomo_web_data/_data .

#3. Symmetric AES256 with the passphrase from Vault. No keyring on the host.
GPG_PASS=$(vault kv get -field=passphrase secret/cloud-lord/backups/gpg-passphrase-matomo)
echo "$GPG_PASS" | gpg --batch --yes --passphrase-fd 0 \
  --symmetric --cipher-algo AES256 \
  --output "$ENCRYPTED" "$TARBALL"

#4. Upload the encrypted artifact to S3 — never the plaintext tarball.
aws s3 cp "$ENCRYPTED" "s3://cloud-lord-matomo-backups/${DATE}/$(basename "$ENCRYPTED")"
```

Why GPG-then-S3 in that order, instead of leaning on SSE-S3 alone? SSE-S3 protects the bytes at rest in AWS. It does not protect them in transit on my host, in the staging temp file, or in the rare case where AWS itself is the threat model — a leaked role, a misconfigured policy, a future region-wide audit dump. AES256 with a Vault-held passphrase means the bucket can be world-readable by accident and the contents are still ciphertext. The bucket is not world-readable; this is defense-in-depth, and the cost is one more line of script.

The cron entry runs at 03:30 UTC daily — 30 minutes offset from the mail-server backup at 04:00 UTC, so the host's IO is not contended. The script logs to `/var/log/matomo-backup.log`. If two consecutive runs fail, the on-host monitor sends an alert mail through the same Mailcow stack I wrote about in [From dictation to deploy: how I shipped a Mailcow stack via voice-driven Pulsar Relay plans](/blog/from-dictation-to-deploy-mailcow), which is the loop-closure I care about: the analytics box and the mail box back each other up.

The restore drill is its own `scripts/restore.sh`. It pulls the most recent encrypted tarball from S3, decrypts to `/tmp/matomo-restore/`, extracts, prints row counts on the core Matomo tables, and stops. It does not auto-apply to the live database — restore is a manual decision, and a script that can silently overwrite production is one bad cron away from a disaster. Per my own rule, a backup is not "done" until I have run that drill end-to-end at least once and confirmed the structure looks right. My validation report for the first drill lives in the cloud-lord program plan; the short version is that the most recent tarball decrypted cleanly, the `matomo_log_visit` and `matomo_log_link_visit_action` tables had row counts in the right ballpark, and the schema matched the live install at the major version.

## What I'd improve

A short and honest list, because the post is not done if I do not write it.

- The Matomo container restart kills active sessions. There is no rolling-update gymnastics here; this is one box, one container. If I bump the Matomo image, every visitor who is mid-page-view at that second loses their session-continuation cookie. I do the bumps at 04:00 UTC and accept the cost.
- There is no point-in-time recovery on the database. The backups are nightly snapshots. Lose the host between snapshots, and you lose up to 24 hours of analytics. I do not care enough about analytics to pay for binlog shipping; if you do, MariaDB binlogs streamed to S3 are the obvious add-on.
- The consent banner is a bit aggressive on first load. Even with the 500 ms delay, on a slow connection the page paint and the snackbar appear close enough together that returning users with cleared local storage occasionally complain. A more sophisticated build would defer the banner until after the first scroll or the first interaction.
- The IP allowlist on the admin paths is brittle. My home IP changes when I swap to mobile data. I have made peace with bouncing through a small VPN exit when I need the admin UI, but a smarter setup would put the admin behind an SSO bouncer instead of a static allowlist.
- I am not running the Matomo `TwoFactorAuth` plugin on operator login because of a forgotten setup step — only on the admin account. That is on the punch list.

None of these block the stack from being useful. They are the things I would tighten in the next pass.

## A copy-able starter

The full module shape is in my private infrastructure-automation repo, but the recipe is portable enough to lift in an afternoon:

- One Terraform environment per backup bucket. Reuse a `private_versioned_bucket` module — versioning on, SSE-S3, lifecycle to Glacier IR at 30 days, expire at 180 days, fully private.
- Extend the S3 access IAM policy file in place; do not invent a new role.
- One Matomo repo with `docker-compose.template.yml` (services: `matomo:5-apache`, `mariadb:11`, archiver sidecar; `mem_limit: 400m / 250m / 150m`; persistent volumes; expose Matomo on `127.0.0.1:8090` only).
- Vault paths under `secret/cloud-lord/matomo/...` for admin password, DB root, salt, and the GPG passphrase under `secret/cloud-lord/backups/...`.
- `scripts/server-install.sh` reads those out of Vault, writes them to a deploy-time `.env`, pulls the rendered `docker-compose.yml` from artifact S3, and `docker compose up -d`.
- `scripts/backup.sh` (above) on a cron, `scripts/restore.sh` for the drill.
- Host nginx vhost for the public hostname, IP-allowlisted on `/admin/*` and `/index.php?module=Login*`, HSTS plus `X-Robots-Tag: noindex, nofollow` on the admin paths so Matomo's login page never shows up in search.
- On the website: `<TrackingProvider>` mounts `requireConsent` first, `<ConsentBanner>` records to localStorage and pushes `rememberConsentGiven` / `forgetConsentGiven`. Nothing else.

That is the whole shape. Total Hetzner footprint is under 10 € / month for the VM, plus a few cents in S3 for the encrypted nightly tarballs. The cost is a Saturday, plus the discipline to run the restore drill before you trust the backup.

## So you actually have lawful, useful analytics

If you are running a small site in the EU and your analytics dashboard is either lying (GA4 with a fake banner) or empty (GA4 with an honest banner), self-hosting Matomo is the boring option that fixes both. The data lives where you can prove it lives. The consent banner gates the script the way the law says it has to. Your retention is honest. Your IPs are anonymized at rest. And every line of infrastructure is in code, so you can rebuild the whole thing on a new VM in an afternoon.

If you are building or running a stack like this — Claude-Code agents, AI-driven infra, GDPR-aware analytics — I take a small number of consulting engagements per quarter. Get in touch via the [contact form](/#contact).
