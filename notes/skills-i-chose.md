# Skills I chose

Searched skills.sh on 2026-11-07 with `npx skills find` for: email marketing, email sequence, campaign plan, resend. Star counts are from GitHub on the same day. Nothing has been installed yet.

## Use these

**1. Anthropic's marketing plugin, for planning and writing campaigns**
- Source: `anthropics/knowledge-work-plugins` (the `marketing` plugin)
- Skills I'll use: `campaign-plan` (3.4K installs), `email-sequence` (3K installs), `brand-review`
- Repo: about 35,100 GitHub stars, published by the Anthropic organisation, updated today.
- Why: it comes from the company that makes Claude, the repo is busy and widely trusted, and it gives me plan → write → review in one plugin. Its install count is lower than some others, but the stars and the publisher make it the safest pick.

**2. Resend's own skills, for sending email**
- Source: `resend/resend-skills`, especially `resend` (24.3K installs). `resend/email-best-practices` (8.2K installs) is a useful extra.
- Repo: 211 stars (`resend-skills`) and 147 stars (`email-best-practices`), published by the Resend organisation, updated this week.
- Why: Resend is the email service we'll connect to, so its own team knows the API best and keeps the skill current. The star count is modest, but the publisher is the official one. That matters more than stars here, because a copycat "resend" skill could quietly use our API key in ways we don't expect.

## Avoid these

**1. `caffeinelabs/skills@extension-email-marketing`: 30.4K installs, only 2 GitHub stars**
It was the top result for "email marketing", but it has huge installs, almost no stars, and the repo has no description. Install counts can be pumped up by scripts. Real use usually earns at least some stars, so this mismatch is the classic warning sign.

**2. `mbfinotti/sales-skills` (for example `sales-outbound-sequence`, `cold-email-subject-line-tester`): about 33K installs each, only 3 GitHub stars**
It has the same mismatch: dozens of skills that each claim about 33K installs, from a personal repo created in September 2026 with 3 stars. It's also aimed at cold sales outreach, not emails to people who asked to hear from us.

(I'd also skip `samber/dev-event-organizer-skills`: 6.6K installs, 4 stars.)

## How I decided

Before installing any skill, check these three things:

1. **Who publishes it.** Prefer the official publisher, such as `anthropics` for Claude and `resend` for Resend, or a well-known author. Look at the GitHub owner, not just the skill's name.
2. **Do installs and GitHub stars match?** Install counts on skills.sh can be faked. Thousands of installs with only a handful of stars is a red flag. Also check that the repo was updated recently.
3. **Read the SKILL.md before installing.** A skill is instructions Claude follows, and it can run commands or touch my API keys. Open it on GitHub and make sure it does only what it says, with no unexpected scripts, network calls or requests for secrets.
