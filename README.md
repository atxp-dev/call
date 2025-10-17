# atxp-call

A command-line tool for calling tools on ATXP MCP servers.

## Installation

```bash
npm install
```

## Configuration

Before using `atxp-call`, you need to set up your ATXP connection string:

```bash
export ATXP_CONNECTION="your-connection-string"
```

Or create a `.env` file in the project directory:

```
ATXP_CONNECTION=your-connection-string
```

You can find your connection string at https://accounts.atxp.ai

## Usage

```bash
./atxp-call.js <server> <tool> <arguments_json> [--x402] [--no-parse] [--verbose]
```

Or if installed globally:

```bash
atxp-call <server> <tool> <arguments_json> [--x402] [--no-parse] [--verbose]
```

### Required Arguments

- `server` - The server URL or identifier (https:// is prepended automatically if not present)
- `tool` - The tool name to invoke
- `arguments_json` - JSON string containing tool arguments

### Optional Flags

- `--x402` - Enable x402 mode
- `--no-parse` - Return full result object instead of parsed text
- `--verbose` - Show verbose output from dependencies

## Examples

### ATXP MCP Servers

Search X (formerly Twitter) for posts:

```bash
./atxp-call.js x-live-search.mcp.atxp.ai x_live_search '{"query": "What are the latest updates from Space X?"}'
```

Perform web search:

```bash
./atxp-call.js search.mcp.atxp.ai search '{"query": "latest AI developments"}'
```

Crawl a webpage:

```bash
./atxp-call.js crawl.mcp.atxp.ai crawl '{"url": "https://example.com"}'
```

Generate an image:

```bash
./atxp-call.js image.mcp.atxp.ai generate_image '{"prompt": "A sunset over mountains", "sync": true}'
```

Execute code in a sandbox:

```bash
./atxp-call.js code.mcp.atxp.ai execute_code '{"language": "python", "code": "print(\"Hello, World!\")"}'
```

Research a topic:

```bash
./atxp-call.js research.mcp.atxp.ai research '{"query": "quantum computing applications", "depth": "quick"}'
```

See available MCP servers at: https://docs.atxp.ai/client/mcp_servers

## Dependencies

- [@atxp/client](https://www.npmjs.com/package/@atxp/client) - ATXP client library
- [@atxp/x402](https://www.npmjs.com/package/@atxp/x402) - X402 protocol support

## License

MIT
