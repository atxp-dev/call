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

Call a tool with basic arguments:

```bash
./atxp-call.js example.com my-tool '{"param1": "value1", "param2": "value2"}'
```

Call a tool with x402 mode enabled:

```bash
./atxp-call.js example.com my-tool '{"param1": "value1"}' --x402
```

Get the full result object:

```bash
./atxp-call.js example.com my-tool '{}' --no-parse
```

## Dependencies

- [@atxp/client](https://www.npmjs.com/package/@atxp/client) - ATXP client library
- [@atxp/x402](https://www.npmjs.com/package/@atxp/x402) - X402 protocol support

## License

MIT
