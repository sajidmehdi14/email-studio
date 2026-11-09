#!/usr/bin/env node
// Send guard: a PreToolUse hook for the Resend MCP tools (matcher mcp__resend__.*).
// It reads the tool call as JSON from standard input.
// Exit 0 allows the call. Exit 2 blocks it, and the reason on stderr is shown to Claude.

const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);
const CHECK_RECIPIENTS = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  process.stderr.write(`Send guard blocked this: ${reason}\n`);
  process.exit(2);
}

// Turn "Name <a@b.com>", a single string or a list into plain lower-case addresses.
function addresses(value) {
  if (value == null) return [];
  const list = Array.isArray(value) ? value : String(value).split(",");
  return list
    .map((item) => String(item).trim())
    .filter(Boolean)
    .map((item) => {
      const match = item.match(/<([^>]+)>/);
      return (match ? match[1] : item).trim().toLowerCase();
    });
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    block("could not read the tool call, so it is blocked to be safe.");
  }

  const toolName = String(call.tool_name || "");
  const action = toolName.split("__").pop();
  const input = call.tool_input || {};

  if (ALWAYS_BLOCK.has(action)) {
    block(`${action} can reach whole lists of people, so it is never allowed here.`);
  }

  if (!CHECK_RECIPIENTS.has(action)) {
    process.exit(0);
  }

  const myEmail = (process.env.MY_EMAIL || "").trim().toLowerCase();
  const emails = action === "send-batch-emails" ? input.emails || [] : [input];

  for (const email of emails) {
    for (const field of ["to", "cc", "bcc"]) {
      for (const address of addresses(email?.[field])) {
        const allowed = address.endsWith("@resend.dev") || (myEmail && address === myEmail);
        if (!allowed) {
          block(
            `${address} (in "${field}") is not a @resend.dev test address or your own email (MY_EMAIL).`
          );
        }
      }
    }
  }

  process.exit(0);
});
