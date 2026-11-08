---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file format

This rule covers every email file in every campaign, and nothing else. Each email file must:

- **Start with the subject and preview.** Line 1 is `Subject: ...` at 50 characters or fewer. Line 2 is `Preview: ...` at 90 characters or fewer. Count the characters, don't guess.
- **Greet the reader by name** with `{{first_name}}`, for example `Hi {{first_name}},`.
- **Have exactly one main link**, written as a Markdown link to a page of the book: `[Button text](https://agentfactory2.panaversity.org/certification-and-portfolio-roadmaps/)`. Use the roadmap page unless the campaign plan names a different page of https://agentfactory2.panaversity.org/ for that email. No other links anywhere in the email.
- **End with our sign-off from `brand/voice.md`**, then this two-line footer, exactly as written, as plain text and never inside a code block:

You're getting this because you signed up for updates about The AI Agent Factory.
Panaversity, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Also:

- Use no word or claim that `brand/voice.md` says to avoid.
- One email per file, holding only the email itself: no subject-line options, notes or explanations.
