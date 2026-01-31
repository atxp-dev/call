# atxp-call

A command-line tool for calling tools on ATXP MCP servers.

## Installation

Run directly with npx (no installation required):

```bash
npx atxp-call <server> <tool> <arguments_json>
```

Or install globally:

```bash
npm install -g atxp-call
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
npx atxp-call <server> <tool> <arguments_json> [--x402] [--no-parse] [--verbose]
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
npx atxp-call x-live-search.mcp.atxp.ai x_live_search '{"query": "What are the latest updates from Space X?"}'
```

Perform web search:

```bash
npx atxp-call search.mcp.atxp.ai search '{"query": "latest AI developments"}'
```

Crawl a webpage:

```bash
npx atxp-call crawl.mcp.atxp.ai crawl '{"url": "https://example.com"}'
```

Generate an image:

```bash
npx atxp-call image.mcp.atxp.ai generate_image '{"prompt": "A sunset over mountains", "sync": true}'
```

Execute code in a sandbox:

```bash
npx atxp-call code.mcp.atxp.ai execute_code '{"language": "python", "code": "print(\"Hello, World!\")"}'
```

Research a topic:

```bash
npx atxp-call research.mcp.atxp.ai research '{"query": "quantum computing applications", "depth": "quick"}'
```

See available MCP servers at: https://docs.atxp.ai/client/mcp_servers

## Dependencies

- [@atxp/client](https://www.npmjs.com/package/@atxp/client) - ATXP client library
- [@atxp/x402](https://www.npmjs.com/package/@atxp/x402) - X402 protocol support

## License

MIT
