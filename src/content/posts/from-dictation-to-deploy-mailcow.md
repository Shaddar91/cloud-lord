---
title: "From dictation to deploy: how I shipped a Mailcow stack via voice-driven Pulsar Relay plans"
slug: from-dictation-to-deploy-mailcow
date: 2026-05-15
tags: [ai-engineering, pulsar-relay, claude-code, voice-automation, mailcow]
excerpt: "I dictated a sentence at 2 AM. Six hours and 14 sequential agent components later, I had a self-hosted Mailcow instance with encrypted S3 backups."
author: Tomislav Ivanović
readingTime: 11
---

## The 2 AM dictation

It was past midnight. I was in bed with the voice recorder app open on my phone, talking through what I wanted next on the cloud-lord stack.

Roughly: "I want my own mail server on the Hetzner box. Mailcow. Custom domain. Two mailboxes, engineering at and privacy at, both BCC'd to my personal mailbox. A catch-all for anything else at cloud-lord.com. Encrypted S3 backups every night with a restore drill I can actually trust. SMTP relay through SES so outbound mail doesn't get tagged as spam. And a service account for the contact form to authenticate against."

I hit stop. Whisper transcribed the audio. The voice-processor service in my pipeline picked up the transcript, decided it wasn't a forge update or a one-off pipeline task, and routed the whole thing into the orchestrator chain. An hour later, the orchestrator had decomposed it into a Pulsar Relay plan: 14 components, sequenced by dependencies, each one assigned to a single-skillset agent.

I went to sleep. By the time I woke up, the bulk of the plan had run. Two components were waiting on a human gate — me — to sign off on the backup restore drill. The rest was either green or honestly red, with a clear log of what failed and why.

This post is the full chain, end to end, with no invented metrics.

## The chain: voice → orchestrator → pulsar → executor

There are five stages. Each one is its own systemd service. Each one writes a file to a directory the next stage watches.

**voice-processor.** A polling daemon that watches a transcript drop folder. When a `.txt` file lands, it reads the text, classifies what kind of thing it is (forge note update, single pipeline task, plan), and writes a structured task file to the appropriate queue. For "I want a mail server with backups…" it correctly recognized that this was a multi-step plan, not a single atomic task, and dropped a stub plan file into a holding queue for the orchestrators to pick up.

**orchestrator-v1.** Enriches the task with project metadata. It looks at the keywords and figures out which project this belongs to, `cloud-lord` in this case, because Mailcow on Hetzner with cloud-lord.com routing is one of the named workstreams. Once the project is set, v1 attaches the relevant `CLAUDE.md` paths and known constraints (no real infra without an explicit deployment authorization token, in this case granted) and writes the enriched task forward.

**orchestrator-v2.** Routes the task to the right shape of executor. For a plan, that means breaking the user's prose into components: one component per agent skillset, one deliverable file each, no mixing of terraform and Rust in the same component. For Mailcow + S3 backups, that decomposition came out as: a `bash-scripting-expert` for mailcow REST API work, a `bash-scripting-expert` for the backup scripts, a separate component for the cron + first run + restore drill, and a HUMAN-gate component sitting in front of the "we trust this backup now" decision. v2 wrote the plan into `pulsar-relay/plans/drafts/` and marked it ready for promotion.

**task-executor.** Pulsar Relay runs sequentially: one component at a time, in dependency order. When a component is up, the executor pool spawns a fresh Claude Code session with just that component's context and the relevant `CLAUDE.md` files. The agent does its work, writes a deliverable file, marks the component COMPLETED, and the scheduler moves on. There are 15 executor instances in parallel, but they pick up unrelated atomic tasks; a single plan walks its components serially by design.

**reporter.** Watches the completed-tasks folder. Aggregates plan-level outcomes, writes a session summary, files anomalies into `manual_intervention/` so they don't silently disappear. The reporter is what tells me, at breakfast, whether anything is waiting on a human gate or stuck behind an orphan-heal retry.

Every handoff is a file. There is no shared in-memory state. If the machine reboots mid-plan, the next tick picks up exactly where it left off.

## What Pulsar Relay actually does

Pulsar Relay is the sequential scheduler I wrote in Rust to keep the agent pool from racing on multi-step work. It is, on purpose, a small piece of software: a parser, a state machine, a tick loop.

Plans live in three folders: `drafts/`, `active/`, and `completed/`. The scheduler ignores `drafts/`. Moving a file from `drafts/` to `active/` is the go signal; that is the entire interface for kicking a plan off. The scheduler picks it up on the next tick, reads the components, and starts dispatching them in dependency order. Each component is a `### Component N:` block with a `**Status:** PENDING` line, a `**Agent:** <single-token-name>` line, and instructions in prose.

When a component finishes, the executor flips its status to COMPLETED in place. When a component fails, the scheduler runs a small self-heal loop: re-spawn, retry the read of the deliverable file, mark BLOCKED only if the retry budget is exhausted. Plans get moved to `completed/` (with a timestamp suffix) when every component is green, and to `failed/` when one component is BLOCKED past its budget. The whole plan-lifecycle and chaining mechanism, including how one plan's last component can drop the next plan into `active/`, is [its own post](/blog/pulsar-relay-200-line-scheduler).

One component does one skillset's worth of work. If a component needs both terraform and a Rust binary, it gets split. Components do not chain to each other mid-flight. They retrieve data back to the plan only by writing a file and referencing it.

That sounds restrictive. It is. It's also why the system survives a power cut without losing track of where it was.

## The Mailcow plan that ran

The plan that came out of the orchestrators had 14 component-task IDs grouped into two tracks: Track A for the mailbox plumbing, Track B for the encrypted backups. In execution order:

```
Track A: Mailcow surface
  A1 — Inspect mailcow server for mailboxes-as-code (none — REST API path)
  A2 — Create engineering@ and privacy@ mailboxes; passwords to Vault
  A3 — Per-mailbox BCC forwarders to my personal mailbox
  A4 — Domain catch-all → engineering@
  A5 — ManageSieve filters: sort engineering/privacy into subfolders
  A6 — End-to-end verification: send three test mails, confirm routing

Track B: Encrypted backups + restore drill
  B1 — Anchor the scripts/ folder under the mailcow project
  B2 — mailcow-s3-upload.sh: helper-script backup → tar → GPG → S3
  B3 — Verify the GPG passphrase exists in Vault (fail loud if absent)
  B4 — Idempotent deploy script for the backup machinery
  B5 — Cron entry: 04:00 UTC daily
  B6 — Manual first run: confirm S3 object, decrypt, list contents
  B7 — restore.sh: pull most recent, decrypt, no auto-apply
  B8 — Restore drill: run B7, sample-compare against live mailboxes
```

Every component named one agent. `bash-scripting-expert` got most of Track A and all of Track B. The mailbox creation step talked to the mailcow REST API directly, no UI clicking. Passwords and the GPG passphrase landed in Vault under namespaced paths (`secret/<app>/mail/engineering`, `secret/<app>/backups/gpg-passphrase-mail`) and were never written to disk in plaintext.

The backup script wraps mailcow's own `helper-scripts/backup_and_restore.sh` rather than rolling something custom. Each tarball gets symmetrically encrypted with AES256, keyed off the Vault passphrase, and dropped into `s3://<your-mail-backup-bucket>/YYYY/MM/DD/`. A second JSON artifact in the same upload contains a REST API dump of the alias and mailbox configuration. That's deliberate, because if the mailcow data volume is recoverable but the alias config has drifted, you want the metadata snapshot to compare against.

The restore drill (Component B8) is the part I care most about. It pulls the most recent encrypted archive from S3, decrypts it with the Vault passphrase to `/tmp/mailcow-restore/`, runs `tar -tf` to list contents, and samples a handful of mailboxes to compare structure against the live system. It does not auto-apply. Auto-applying a restore from inside the same plan that produced the backup is the kind of automation that bites you the day a corrupted archive cascades into prod. The drill is a sanity check, not a failover.

The plan ended on a HUMAN gate that asks me, with the B8 transcript in front of me, whether I trust the backup chain. Until I sign off, the trusted-cron downstream components stay PENDING.

## What broke and what didn't

The highlight reel is not the truth.

The first run of this plan died at the preflight component, before any mailcow code ran. The preflight checks were:

```
≥10 GB free disk            PASS  (24 GB)
ports 25, 465, 587, 993, 995 free  PASS
port 8080 free              FAIL  — held by another internal service
port 8443 free              PASS
no host-level MTA           PASS
ports 80/443 held by nginx  PASS
outbound 25 + 587 reachable PASS
≥4 GB free RAM              FAIL  — server has 3.7 GB total, 2.5 GB available
no docker network overlap   PASS
```

Two blockers. The port conflict was a five-minute fix: I remapped an existing internal container off port 8080 to a free port and updated its nginx vhost to match. The RAM blocker was a hardware ceiling. The Hetzner server I was running was a cx22 with 3.7 GB total. Mailcow's own recommendation is 6 GB for stable operation, and the plan was checking for at least 4 GB available. There is no way to satisfy that constraint by stopping services, because the server can't even meet it with zero workload.

So I resized the box up to a cx32 with 8 GB. That's the part that doesn't fit any "voice automation shipped this for me" narrative — I made a billing decision, kicked off a Hetzner resize, waited for the box to come back up, and re-ran the preflight component manually. Then the plan continued.

A few smaller things broke in friendlier ways. The mailcow REST API needed an API key in a specific header, and the first attempt got back a 401 because the key was scoped to read-only. Fixed in-flight by the agent. It noticed the response, looked at the API docs, regenerated the key with write scope, retried. The Sieve filter component had to deal with the SOGo ManageSieve port not being exposed externally; the agent worked around that by tunnelling over SSH and pushing the filters through localhost. Both of those were the kind of glue work I would have done myself, and the difference is that I was asleep while it happened.

The validation report is still a half-filled checklist. DNS sanity is green: MX, A, SPF, DMARC, DKIM, autoconfig CNAME, reverse DNS all match what the plan expected. Inbound mail and the mail-tester score, I need to fill in by hand. That's not a failure, it's just the part where a plan can't substitute for me opening Gmail and confirming a test message arrived in the right folder.

The structural separation between *backing up* and *trusting the backup* is the thing the plan got right that I wouldn't have built on my own first time. The B-track explicitly produces the backup, then explicitly drills it, and then waits for me to gate the rest of the chain on whether I trust the result. I have shipped backup scripts before that I never actually restored from. This plan would not let me do that.

## What this means for one-person shops

I am one person. There is no team behind cloud-lord. The infrastructure I run for it (Mailcow, encrypted S3 backups, Matomo with consent-gated tracking, a Rust contact form backend, GitHub Actions OIDC deploys, Hetzner plus AWS hybrid) is the kind of stack that would have been a small team's worth of work five years ago.

What makes it tractable for one person is offloading the boring, sequenced, multi-step parts to a pool of agents with strict component isolation, while keeping the decisions (what to ship, when to gate, what to trust, when to bail and resize the server) for myself. That's the discipline that makes the difference between automation that is useful and automation that is a liability.

It also means the entire chain is auditable. Every component left a deliverable file. Every plan is in `completed/` or `failed/` with a timestamp. The voice transcript that started it is on disk. If a future me, or a client of mine, asks "what did this run actually do," the answer is a directory tree, not a memory.

That is the operating model the Cloud Lord program ships under. It is what I am offering to the small number of clients I take on each quarter, a sequenced, gated, file-driven way to make a one-person infrastructure stack hold up under real work.

## Get in touch

If you're building or running a stack like this — Claude-Code agents, AI-driven infra, GDPR-aware analytics — I take a small number of consulting engagements per quarter. Get in touch via the [contact form](/#contact).
