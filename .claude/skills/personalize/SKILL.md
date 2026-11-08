---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

The campaign folder to personalize is: $ARGUMENTS

## 1. Check the input

If no campaign folder was given above, or the folder has no `emails/` folder, **stop**. Use Glob to list the campaign folders that exist (`campaigns/*/emails/*.md`), show them as a short list, ask which one to use, and write nothing.

## 2. Read what you need

- `<campaign folder>/emails/*.md`: the final emails. These are the originals. **Never change them.**
- `leads/leads.csv`: get the lead groups from the `group` column, using each distinct value once. Today they are `everyday-professionals`, `builders` and `founders`, but always read them from the file.
- `leads/CLAUDE.md`: the "Groups" section says who each group is and which exam comes first for them.
- `brand/voice.md`: our voice, words to use and avoid, and claims we never make.
- `.claude/rules/emails.md`: the email format every version must still follow.

## 3. Write one version per email per group

For each email file and each group, write `<campaign folder>/groups/<group>/emails/<same file name>`.

In each version, change **only** these two things:

1. **The opening line:** the first sentence after the greeting. Rewrite it so it speaks to that group, their route and what they care about.
2. **One example:** a single sentence somewhere in the body. Swap in an example that fits that group, such as their first exam, a task from their kind of work, or the milestone that suits them.

Keep **everything else exactly the same** as the original: the `Subject:` and `Preview:` lines, the greeting with `{{first_name}}`, the structure and the other paragraphs, the one link (same text and same URL), the sign-off, and the two-line footer as plain text. Copy them character for character.

Every version must still follow `.claude/rules/emails.md` and `brand/voice.md`. Don't add a word to avoid or a claim we never make, and don't add a second link. The new lines must stay accurate to the book. For example, a version for a group must name that group's correct first exam.

## 4. Reply with a short summary only

Don't show the emails or explain your changes. Reply with just:

- How many files you wrote, for example "Wrote 12 files: 4 emails × 3 groups."
- One example opening line per group, taken from the email 01 version.
