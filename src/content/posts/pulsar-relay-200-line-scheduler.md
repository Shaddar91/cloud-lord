---
title: "Pulsar Relay: a 200-line task scheduler I built to keep my agent pool sequential when I needed it"
slug: pulsar-relay-200-line-scheduler
date: 2026-05-22
tags: [pulsar-relay, claude-code, ai-engineering, agent-orchestration, rust]
excerpt: "Most LLM agent pools are happily concurrent. Sometimes you need them not to be, and when you do, LangGraph and Temporal are big tools for a small problem."
author: Tomislav Ivanović
readingTime: 9
---

## The problem

Concurrent agent pools are great for "do this and that and that." Fan out, collect, done. They are terrible for "do this, THEN that, THEN that."

The first Pulsar moment for me was a multi-component task to bootstrap a new project. The pipeline plan, more or less in order, was: scaffold the repo, write the database schema, generate the API stubs from the schema, wire the frontend against the stubs, write tests against the running endpoints. Five sensible steps with hard dependencies between them.

I dropped that into the pipeline and walked away. By the time I came back, my pool of executors had picked up the plan and started dispatching components in parallel. The agent writing tests had run before the stubs existed. The frontend agent had hand-rolled mock endpoints rather than wait for the real ones. Every executor exited green from its own perspective. The deliverable was a half-built mess that nobody was wrong to have produced.

The pool was honest about what it had been told to do. I was the one treating a sequence like a set of independent tasks. What I needed was something that would say "no, you wait, Component 2 does not start until Component 1 is COMPLETED in the file."

That something is Pulsar Relay.

## What Pulsar Relay is, in one paragraph

Pulsar Relay is a sequential scheduler I wrote in Rust. Plans are markdown files with `### Component N:` headers. The scheduler watches a folder, picks up plans, dispatches one component at a time to the same agent pool the rest of my pipeline already uses, and writes results back into the same file. There is no database, queue daemon, service mesh, or orchestration UI. The binary lives at `~/personal/projects/pulsar-relay`, runs as a single systemd user service, and has zero external dependencies beyond the agent-spawn script my pipeline shipped with already. I started with about 200 lines for the v1 tick loop plus a parser; it has grown since, but the public interface (drop a markdown file in a folder) has not.

## The plan format

A plan is a markdown file. The scheduler cares about exactly three things in it: a `**Scheduler:** pulsar-relay` line in the header so it knows the file is its responsibility, a sequence of `### Component N:` blocks, and the metadata that lives directly under each component header.

A component block looks like this:

```markdown
### Component 3: Generate REST endpoints
**Status:** IN_PROGRESS
**Agent:** backend-developer
**Label:** local
**Deliverable:** src/api/handlers.rs

Read the schema deliverable from Component 1.
Generate one handler per resource — GET, POST, PATCH, DELETE.
Wire each into the router. Tests are out of scope for this component
(those are Component 5).
```

The parser is unforgiving about three things, and that's on purpose:

- **Component header.** Regex `### (?:Component|Phase) (\d+):\s*(.+)`. The number must be a sequential integer. Not a placeholder, not `### Component N:`, not `### Component N+1:`. If you write `### Component A:`, the parser ignores it and the rest of the file looks malformed downstream.
- **Agent name.** Regex `\S+`. Exactly one token, no whitespace. `terraform-expert` works. `terraform expert` does not. The second word silently becomes part of whatever the parser reads next, which is usually "the rest of the line as your Label," and dispatch fails downstream because there is no agent called `expert`.
- **Status.** A small enum: `PENDING`, `IN_PROGRESS`, `COMPLETED`, `FAILED`, `BLOCKED`. Anything else falls through to PENDING and the component gets re-dispatched on the next tick.

There is one more rule I learned the hard way and now treat as non-negotiable: **one component, one agent skillset, one deliverable file.** If a step needs both terraform and a Rust binary, I split it. Components do not chain to each other mid-flight, and they do not read each other's in-memory state. The only way one component sees what an earlier component did is by reading the deliverable file the earlier component left on disk and that is referenced in the earlier component's `**Result:**` line.

The whole file is text. You can grep it. You can `git diff` it. You can hand-edit a stuck component back to PENDING and the next tick will pick it up. There is no hidden state in a database somewhere; what you see is what the scheduler sees.

## The lifecycle: drafts → active → completed

Three folders, one binary, no queue:

```
$FORGE_DIR/projects/pulsar-relay/plans/
├── drafts/      ← write here, scheduler ignores
├── active/      ← move here, scheduler picks up on next tick
├── completed/   ← scheduler moves finished plans here (with timestamp)
└── failed/      ← scheduler moves blocked plans here when retry budget runs out
```

The "go" signal is `mv drafts/plan-x.md active/plan-x.md`. That is the entire interface for kicking off a plan; there is no CLI subcommand, API call, or UI button. The scheduler ticks every 60 seconds, scans `active/`, and for each plan dispatches the next PENDING component if no earlier component is still IN_PROGRESS.

When every component on a plan is COMPLETED (or COMPLETED and FAILED, since a failed component still terminates a plan), the file moves to `completed/<YYYY-MM-DD>/plan-x_<timestamp>.md`. A move on the same filesystem is atomic; a half-completed move would only mean an extra dispatch attempt on the next tick, not corruption.

```
            write a    mv to        tick                    
              plan     active        loop                  
            ┌─────────┐  →   ┌──────────┐  →    ┌────────────┐
            │ drafts/ │      │ active/  │       │ completed/ │
            └─────────┘      └────┬─────┘       └────────────┘
                                  │
                                  │  retry budget exhausted
                                  ▼
                             ┌──────────┐
                             │ failed/  │
                             └──────────┘
```

The markdown file is the queue. The state is in the file. The history is `git log`. The entire lifecycle is observable with `ls` and `cat`. When something looks wrong, the debugger is `less`.

I have around sixty real plans in `completed/` to date: research plans, execution plans, follow-up bug-fix plans, the occasional smoke test. None of them required me to think about the scheduler. They required me to write the plan well.

## Plan chaining

The only "concurrency primitive" Pulsar has is also a file move. If I want plan A to run, and then plan B to run after it finishes, I write plan A's last component as the activator for plan B:

```markdown
### Component 5: Activate the deploy plan
**Status:** PENDING
**Agent:** bash-scripting-expert
**Label:** local

mv $FORGE_DIR/projects/pulsar-relay/plans/drafts/plan-b.md \
   $FORGE_DIR/projects/pulsar-relay/plans/active/plan-b.md
```

When Component 5 of plan A completes, plan B is now in `active/` and the scheduler picks it up on the next tick. There is no fan-out. One plan triggers one plan. If I want a chain of three, the third plan ships with its own activator tail. The dependency graph is the directory listing.

This sounds primitive because it is. It is also the only chaining mechanism I have ever used that I can audit by running `ls -lt completed/`. Almost every research plan I write ends with a chain-out to an execution plan: the research plan investigates the uncertainty, produces an execution plan in `drafts/` as part of its deliverable set, and its last component activates that execution plan. I get to read both plans when they are done, in order, with timestamps. The Forge `git log` reads as a project diary.

I cover the chained voice-to-deploy flow end to end in [from dictation to deploy](/blog/from-dictation-to-deploy-mailcow). Pulsar is the spine of that whole run.

## A war story

The first time the self-heal loop genuinely bit me was on a plan with two HUMAN gates.

A HUMAN gate is a component whose `**Agent:**` line is the literal string `HUMAN`. The scheduler does not dispatch HUMAN components. It stops there and waits for me to flip the status from PENDING to COMPLETED by hand. That is how I gate destructive or trust-requiring steps: "you do not proceed past this until a real person confirms the backup restore drill matched the live mailboxes."

On the cloud-lord rollout plan, I had two HUMAN gates that I had already marked COMPLETED ahead of time, per a pre-approval directive I had given the system. The plan should have skipped them on the next tick and continued on its way. Instead, what happened was:

1. I made a small unrelated edit elsewhere in the plan.
2. The edit changed the file's checksum, which triggered re-evaluation of every component.
3. During that re-evaluation, the parser saw the two HUMAN-gate components as PENDING. The reason: a nested instructions block inside each one contained a stray duplicate `**Status:** IN_PROGRESS` line. The parser was matching the first `**Status:**` it saw inside the section body, which was the nested one, instead of the canonical one at the component header.
4. The scheduler took those (now apparently-PENDING) components and tried to dispatch them.
5. The prep-agent in front of dispatch correctly refused: HUMAN gates are explicitly carved out of pipeline routing.
6. The orphan-heal loop saw "dispatched component, no in-flight pipeline task" and incremented a retry counter.
7. After four retries each, both gates were flipped to BLOCKED with `orphan-dispatch-limit-exceeded (4 retries)`. The whole downstream chain stopped.

Two bugs, layered. The parser was reading the wrong `**Status:**`. The heal loop did not have a special case for HUMAN agents. Either one alone would have been recoverable. Together, they cost me a deploy.

The fix was small in both places. The parser now treats the first `**Status:**` line inside the component bounds, but I made it stricter about what counts as inside the bounds, so nested code-fenced or indented blocks cannot shadow the header. In `heal.rs`, the orphan loop short-circuits on `agent == "HUMAN"` before doing anything else; HUMAN gates have no orphan semantics, because there was never a pipeline task to be orphaned in the first place. I added a unit test for each. The next tick after the patch — 22:52:07Z, I still remember the timestamp — picked up a now-clean re-flip of both gates and the chain finished without further intervention.

It taught me that a small system has to be doubly disciplined about its parsing rules, because there is no service mesh between the parser and the consequences. If the parser misreads a Status line, the scheduler dispatches the wrong work within the same tick. There is no buffering layer to soften the blow.

## What I would do differently

A few decisions I now wish I had made the other way.

**The agent-name regex was too lenient.** `\S+` accepts anything that isn't whitespace. That meant a typo like writing a model name (`claude-opus-4-6`) where an agent name belonged was happily accepted, and dispatch failed downstream when no such agent existed. Tightening it to `[a-z][a-z0-9-]*` plus a lookup against the agent registry at parse time would catch that at the source instead of three steps deep into a failing tick.

**Auto-writing the plan header is a churn problem.** The scheduler maintains `**Plan Status:**` and `**Progress:**` at the top of every active plan and rewrites them after each tick. That is useful for `vps-status` and at-a-glance triage, but it means every tick on a slowly-progressing plan produces a `git diff` even when nothing meaningful happened. If I were doing it again I would compute that header on demand from the file, not persist it back into the file.

**`**Result:**` parsing was sloppy in v1, then over-tightened in v2.** The first version took everything between the `**Result:**` marker and the next blank line. The second version took only one line. Both are defensible, but flipping between them mid-flight is the actual mistake. A few existing plans had paragraphs in their Result sections that silently lost their tails when I tightened the parser. Pick once, document, and write a migration if you change your mind.

**`Execution Status:` on completed pipeline tasks was an afterthought.** For a long time I assumed a task landing in `completed/` meant "the work succeeded." It doesn't. It means "the executor returned." A task can land in `completed/` with a FAILED execution status, and if the scheduler doesn't read for that, you mark a broken component as done. I bolted the check on later. I would build it in from day one if I started over.

None of these are catastrophic. They are the kind of "I see why I did it this way at the time" frictions that any small system that survives long enough accumulates. Worth flagging for anyone tempted to copy this pattern wholesale.

## Why I didn't use LangGraph or Temporal

Both are good tools. They are also enormous tools for the problem I had.

LangGraph assumes the orchestration graph is the interesting object: that you will want branching nodes, fan-out, retries with backoff, conditional edges, an evaluator-controlled flow. For an LLM agent app where the graph *is* the product, that is the right assumption. For me, the orchestration was always the easy part. I wanted "do A, then B, then C, where C only starts after B's deliverable file exists on disk." That does not need a DAG library; it needs a for-loop with a status enum.

Temporal is the same shape, one order of magnitude bigger. It assumes you have workers across machines, you need durable execution semantics across crashes, you will grow into retries with exponential backoff and multi-region failover. Pulsar's "durability story" is that the state lives in a markdown file on disk; if the machine reboots, the next tick rereads the file and continues. There is no execution context to restore, because there is no execution context in memory in the first place.

The two real costs of using something bigger would have been:

- **Operational footprint.** A workflow engine adds at least a database, usually a queue broker, and a control-plane process. My total operational footprint for Pulsar is one systemd user unit and one Rust binary. That is the entire deployment story.
- **Authoring friction.** Plans-as-markdown means I can write one in a text editor, dictate one and have an agent expand it into the right shape, or hand-edit one mid-flight when I see something is wrong. Plans-as-code introduce a deploy step between "I have an idea" and "the scheduler can run it." On a one-person stack, that deploy step is the difference between trying something and not bothering.

The framing I keep coming back to is that in agent systems the orchestration is the easy part and the prompts are the hard part. Pulsar's job is to get out of the way of the prompts. Big orchestration tools want to dominate the architecture; Pulsar wants to be invisible in it.

If you find yourself reaching for a workflow engine because you need *strict sequencing* of an LLM agent pool, consider that you might just need a 60-second tick, a folder watcher, and a status enum. That is what Pulsar is. It is not impressive. It is also the part of my stack that has needed the least intervention in the months it has been running.

## Get in touch

If you're building or running a stack like this — Claude-Code agents, AI-driven infra, GDPR-aware analytics — I take a small number of consulting engagements per quarter. Get in touch via the [contact form](/#contact).
