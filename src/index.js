#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const BASE_API_URL = "https://agentweb-api.agentweb-hub.workers.dev";
const GUARD_API_URL = "https://agentguard-api.agentweb-hub.workers.dev";

const server = new Server(
  {
    name: "agentweb-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available MCP tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "extract_web_markdown",
        description: "Fetches any webpage, strips ads, scripts, navbars, and cookie notices, and returns clean LLM-optimized Markdown with token estimates, reading time, and metadata.",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "The full URL of the webpage to convert to Markdown (e.g. 'https://en.wikipedia.org/wiki/AI')",
            },
          },
          required: ["url"],
        },
      },
      {
        name: "extract_b2b_contacts",
        description: "Scrapes a website and extracts business emails, contact phone numbers, WhatsApp, and social media links (Twitter/X, LinkedIn, GitHub, Instagram) in structured JSON.",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "The website or company URL to extract contact information from",
            },
          },
          required: ["url"],
        },
      },
      {
        name: "repair_broken_json",
        description: "Automatically repairs malformed, truncated, or unquoted JSON produced by LLMs (fixing unclosed braces, trailing commas, Python booleans/None, and markdown code blocks).",
        inputSchema: {
          type: "object",
          properties: {
            raw_text: {
              type: "string",
              description: "The malformed JSON string to fix",
            },
          },
          required: ["raw_text"],
        },
      },
      {
        name: "detect_tech_stack",
        description: "Analyzes any website URL and identifies its CMS (WordPress, Shopify, Webflow), JavaScript frameworks (Next.js, React, Vue), analytics, hosting CDN, and security headers.",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "The URL of the website to analyze",
            },
          },
          required: ["url"],
        },
      },
      {
        name: "scan_prompt_injection",
        description: "Scans untrusted user prompts, retrieved RAG content, or web text for 30+ indirect prompt injection attacks, DAN jailbreaks, system prompt overrides, and adversarial exploits.",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The prompt, email, or web text to scan for security threats",
            },
            strictMode: {
              type: "boolean",
              description: "Whether to enforce strict threat thresholds (default: false)",
            },
          },
          required: ["text"],
        },
      },
      {
        name: "mask_sensitive_pii",
        description: "Redacts API keys (OpenAI, Anthropic, AWS, GitHub), credit cards, SSNs, passwords, and sensitive emails from text before sending to LLMs.",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The text to redact sensitive information from",
            },
          },
          required: ["text"],
        },
      },
    ],
  };
});

// Handle Tool Execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "extract_web_markdown") {
      const res = await fetch(`${BASE_API_URL}/api/v1/extract-markdown`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: args.url }),
      });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "extract_b2b_contacts") {
      const res = await fetch(`${BASE_API_URL}/api/v1/extract-contacts?url=${encodeURIComponent(args.url)}`);
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "repair_broken_json") {
      const res = await fetch(`${BASE_API_URL}/api/v1/repair-json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw_text: args.raw_text }),
      });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "detect_tech_stack") {
      const res = await fetch(`${BASE_API_URL}/api/v1/tech-stack?url=${encodeURIComponent(args.url)}`);
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "scan_prompt_injection") {
      const res = await fetch(`${GUARD_API_URL}/api/v1/scan-prompt-injection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: args.text, strictMode: args.strictMode }),
      });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    if (name === "mask_sensitive_pii") {
      const res = await fetch(`${GUARD_API_URL}/api/v1/mask-pii`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: args.text }),
      });
      const data = await res.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      isError: true,
      content: [{ type: "text", text: `Error executing ${name}: ${error.message}` }],
    };
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

run().catch((error) => {
  console.error("Fatal MCP Server Error:", error);
  process.exit(1);
});
