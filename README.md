# AgentWeb & Guard MCP Server ⚡🛡️

Universal Model Context Protocol (MCP) server for **Claude Desktop, Cursor, Windsurf, and Autonomous AI Agents**.

Provides instant access to:
- 🌐 **Web-to-Markdown Scraper:** Strip ads, scripts, navbars & extract clean LLM-optimized Markdown.
- 🎯 **B2B Contact Discovery:** Extract verified business emails, phone numbers, and social links.
- 🔧 **Auto-Repair JSON:** Automatically fix malformed or truncated JSON from LLMs.
- 💻 **Tech Stack Detector:** Detect CMS, JS frameworks (Next.js, React), and analytics.
- 🛡️ **Prompt Injection Scanner:** Protect against indirect prompt injections and jailbreak attacks.
- 🔒 **PII Masker:** Detect and redact API keys, credentials, and credit card numbers.

## 🚀 Quick Install in Claude Desktop & Cursor

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agentweb": {
      "command": "npx",
      "args": ["-y", "agentweb-mcp"]
    }
  }
}
```

## 🛠️ Tools Included
- `extract_web_markdown`: Converts any webpage to clean semantic Markdown.
- `extract_b2b_contacts`: Extracts emails, phones, and social links.
- `repair_broken_json`: Auto-repairs broken LLM JSON.
- `detect_tech_stack`: Analyzes site technologies.
- `scan_prompt_injection`: Scans prompts for adversarial jailbreaks.
- `mask_sensitive_pii`: Redacts secrets, API keys, and sensitive PII.

---
Built by [tofan96you](https://github.com/tofan96you)


## 💰 Pricing

**Start free — 10 requests/day, no signup, no card.** Upgrade only if it earns a place in your workflow.

| Plan | Price | Pay with |
|------|-------|----------|
| **Free** | $0 | 10 requests/day — no signup needed |
| **Pro** (this server only) | **$7.99** lifetime | 💳 Gumroad **or** 🪙 Solana USDC |
| **All-Access Suite** (all 44+ servers) | **$14.99** lifetime | 💳 Gumroad **or** 🪙 Solana USDC |

### 💳 Option 1 — Gumroad (PayPal & Credit Cards)

👉 **[amygraphics.gumroad.com/l/mcp-pro](https://amygraphics.gumroad.com/l/mcp-pro)** — select *Single MCP Server* ($7.99) or *All-Access Lifetime Suite* ($14.99). Instant license key delivery.

### 🪙 Option 2 — Solana USDC (instant, no account needed)

Send **$7.99 USDC** (single) or **$14.99 USDC** (all-access) to:

```
8sDLX3okSV974wdjdeKhN9uWLZDr45DeGCJ28zgTLEdJ
```

Then POST your transaction signature to the `/verify-solana` endpoint to activate your lifetime license instantly.
