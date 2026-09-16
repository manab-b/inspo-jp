#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools, SERVER_INSTRUCTIONS } from "./tools.ts";

const server = new McpServer(
  { name: "inspo-jp", version: "0.1.0" },
  { instructions: SERVER_INSTRUCTIONS },
);

registerTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
