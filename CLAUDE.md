# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## The studio

This is an email studio for a small business. We use it to plan email campaigns and write the emails for them.

### Folders

- `brand/`: how the business sounds, meaning its voice, the words it uses and the claims it never makes.
- `leads/`: the practice list of customers the emails are written for.
- `campaigns/`: one folder per campaign, holding its plan and its emails.
- `notes/`: working notes, research and decisions.

### Studio rules

- Write in plain English: short sentences, everyday words, no jargon.
- Never send email to real people.
- Ask me before deleting anything.

### Our brand

Our brand is Panaversity's free book *The AI Agent Factory* (second edition). The emails are for our students, about preparing for the certifications. We use this instead of the course's Kettlebird Tea sample, so when a step in `ASSIGNMENT.md` names Kettlebird Tea, The Steep Club, its link or its footer, adapt it to the book.

@brand/voice.md

## What this is

A hands-on Claude Code course project ("Email Studio Lab"). It builds an email-marketing studio for a made-up tea shop, **Kettlebird Tea**, launching a monthly subscription box, **The Steep Club**. Claude plans the campaign, writes the emails, personalizes them per customer group, and sends them only to a local practice Resend server.

`ASSIGNMENT.md` is the source of truth: 15 steps, each with a **Build** prompt, then a **Check** prompt run in a *fresh* session. When asked to do a step, follow its Build prompt exactly (file names, front matter, folder layout). Many later steps depend on exact paths from earlier ones. Check prompts say "Don't change any files": respect that and only measure and report.

Status: only `ASSIGNMENT.md` exists so far, and the folder is not yet a git repo (`git init` is part of setup). Step 2 asks for the studio's own CLAUDE.md. When doing it, extend this file rather than replacing it.

## Target layout (built across the steps)

- `brand/voice.md`: voice guide, imported into CLAUDE.md with `@brand/voice.md` (step 3).
- `leads/leads.csv`: 24 practice leads, 8 each in `tea-curious`, `gift-buyers`, `daily-drinkers`. Columns: `first_name,last_name,email,group,joined_on,consent`. `leads/CLAUDE.md` holds folder-only rules (step 5).
- `campaigns/<name>/plan.md`, `emails/NN-short-name.md`, `groups/<group>/emails/` (per-group copies with the same file names).
- `.claude/rules/emails.md`: path-scoped rule (`paths: ["campaigns/**/emails/*.md"]`) defining email format (step 6).
- `.claude/skills/personalize/SKILL.md`: `context: fork`, `allowed-tools: Read, Glob, Grep, Write` (step 8).
- `.mcp.json`: Resend MCP (`resend-mcp@2.27.1`) using `${VAR:-default}` expansion so it defaults to practice mode (step 9).
- `.claude/hooks/send-guard.mjs`: PreToolUse hook on `mcp__resend__.*`, registered in `.claude/settings.json` (step 10).
- `review/findings.schema.json` and `scripts/review.mjs`: headless review (step 13).
- `notes/`: working notes, angles, handoffs, scratchpads.
- Step 14 creates sibling folders `../studio-kit` (plugin) and `../client-two` (second client, Rise & Crumb bakery).

## Safety rules (hard requirements)

- Never email real people. Every lead address ends in `@example.com`. Never add real people or real addresses to `leads/`, and never change the `@example.com` addresses.
- Sends through Resend may go only to `@resend.dev` test addresses or the user's own address from the `MY_EMAIL` env var (set in `.claude/settings.local.json`, which is gitignored). The send guard blocks everything else with exit code 2, and always blocks `send-broadcast`, `create-automation`, `send-inbox-draft` and `send-new-inbox-email`. Never try to work around a block.
- Never write a real Resend key into any file. The only key value allowed in the repo is the `re_practice` default.
- Ask before deleting anything.

## Email file format (enforced by `.claude/rules/emails.md`)

- Line 1 `Subject: ...` at 50 characters or fewer; line 2 `Preview: ...` at 90 characters or fewer.
- Greeting uses `{{first_name}}`.
- Exactly one link: `[Button text](https://kettlebird.example/steep-club)`.
- Ends with the brand sign-off from `brand/voice.md`, then this footer as plain text (never in a code block):
  ```
  You're getting this because you joined the Kettlebird Tea waitlist.
  Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}
  ```
- Avoid every word and claim that `brand/voice.md` forbids, such as health or "detox" claims. When checking, measure lengths and link counts with commands instead of eyeballing them.

## Commands

```bash
# Practice Resend server (keep running in a second terminal for steps 9–11, 14)
npx emulate@0.12.3 start --service resend        # serves http://localhost:4000

# Project-scoped marketing plugin (step 2); provides /marketing:campaign-plan, :email-sequence, :brand-review
claude plugin marketplace add anthropics/knowledge-work-plugins --scope project
claude plugin install marketing@knowledge-work-plugins --scope project

# Headless review of a campaign; writes review/findings.json, exits 1 on any high-severity finding
node scripts/review.mjs campaigns/steep-club-launch

# Plugin packaging (step 14)
claude plugin validate ../studio-kit
claude --plugin-dir ../studio-kit                # run from ../client-two
```

Real sending is opt-in only. Set `RESEND_API_KEY` and `RESEND_BASE_URL=https://api.resend.com` in the shell; with nothing set, `.mcp.json` falls back to the practice server.

## Gotchas noted in the assignment

- `--json-schema` takes the schema's **text**, not a file path. `claude -p` output may be one JSON object or a list whose last item is the result, so handle both and read `structured_output`.
- `CLAUDE_HEADLESS=true`, `--batch` and `.claude/config.json` command lists are not real.
- Name forks with `-n` (`claude --resume <name> --fork-session -n <new>`), or resume fails with "matches 2 sessions".
- New skills, rules, plugins and MCP servers load only when a session starts, so a fresh session is needed after adding them.
- In `studio-kit`, hooks use `${CLAUDE_PLUGIN_ROOT}` instead of `$CLAUDE_PROJECT_DIR`. Brand voice, leads, campaigns and email rules stay in each client repo, and the kit must contain no "Kettlebird" references.
