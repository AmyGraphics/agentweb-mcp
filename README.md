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
