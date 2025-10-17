#!/usr/bin/env node

// Check for --verbose flag before loading any dependencies
const isVerbose = process.argv.includes('--verbose');

// Save original console and suppress output from dependencies unless --verbose is set
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

if (!isVerbose) {
  const noop = () => {};
  console.log = noop;
  console.error = noop;
  console.warn = noop;
  console.info = noop;
  console.debug = noop;
}

// Load environment variables from .env file if present
require('dotenv').config();

const { atxpClient, ATXPAccount } = require('@atxp/client');
const { wrapWithX402 } = require('@atxp/x402');

function printUsage() {
  originalConsole.error('Usage: atxp-call <server> <tool> <arguments_json> [--x402] [--no-parse] [--verbose]');
  originalConsole.error('');
  originalConsole.error('Required arguments:');
  originalConsole.error('  server         - The server URL or identifier');
  originalConsole.error('  tool           - The tool name to invoke');
  originalConsole.error('  arguments_json - JSON string containing tool arguments');
  originalConsole.error('');
  originalConsole.error('Optional flags:');
  originalConsole.error('  --x402         - Enable x402 mode');
  originalConsole.error('  --no-parse     - Return full result object instead of parsed text');
  originalConsole.error('  --verbose      - Show verbose output from dependencies');
  process.exit(1);
}

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    originalConsole.error('Error: Missing required arguments\n');
    printUsage();
  }

  // Check for --x402 flag
  const x402Index = args.indexOf('--x402');
  const hasX402 = x402Index !== -1;

  // Remove flag from args if present
  if (hasX402) {
    args.splice(x402Index, 1);
  }

  // Check for --no-parse flag
  const noParseIndex = args.indexOf('--no-parse');
  const hasNoParse = noParseIndex !== -1;

  // Remove flag from args if present
  if (hasNoParse) {
    args.splice(noParseIndex, 1);
  }

  // Check for --verbose flag
  const verboseIndex = args.indexOf('--verbose');
  const hasVerbose = verboseIndex !== -1;

  // Remove flag from args if present
  if (hasVerbose) {
    args.splice(verboseIndex, 1);
  }

  if (args.length !== 3) {
    originalConsole.error('Error: Expected exactly 3 positional arguments\n');
    printUsage();
  }

  let [server, tool, argumentsJson] = args;

  // Prepend https:// if not already present
  if (!server.startsWith('http://') && !server.startsWith('https://')) {
    server = `https://${server}`;
  }

  // Validate arguments_json is valid JSON
  let parsedArguments;
  try {
    parsedArguments = JSON.parse(argumentsJson);
  } catch (error) {
    originalConsole.error(`Error: arguments_json must be valid JSON: ${error.message}\n`);
    printUsage();
  }

  return {
    server,
    tool,
    argumentsJson,
    parsedArguments,
    x402: hasX402,
    noParse: hasNoParse,
    verbose: hasVerbose
  };
}

async function main() {
  const config = parseArgs();

  // Validate ATXP_CONNECTION environment variable
  const atxpConnectionString = process.env.ATXP_CONNECTION;
  if (!atxpConnectionString) {
    originalConsole.error('Error: ATXP_CONNECTION environment variable is not set\n');
    originalConsole.error('Please set the ATXP_CONNECTION environment variable:');
    originalConsole.error('  export ATXP_CONNECTION="your-connection-string"');
    originalConsole.error('');
    originalConsole.error('Or create a .env file in the current directory with:');
    originalConsole.error('  ATXP_CONNECTION=your-connection-string');
    originalConsole.error('');
    originalConsole.error('You can find your connection string at https://accounts.atxp.ai');
    originalConsole.error('');
    process.exit(1);
  }

  const atxpConfig = {
    mcpServer: config.server,
    account: new ATXPAccount(atxpConnectionString),
  };

  // Create a client using the `atxpClient` function
  const client = await atxpClient({
    ...atxpConfig,
    fetchFn: config.x402 ? wrapWithX402(atxpConfig) : undefined,
  });
  const result = await client.callTool({
    name: config.tool,
    arguments: config.parsedArguments,
  });

  // Output to stdout in CLI-idiomatic way
  if (config.noParse) {
    originalConsole.log(JSON.stringify(result, null, 2));
  } else {
    const text = result.content[0].text;

    // Try to parse and pretty-print if it's JSON
    try {
      const parsed = JSON.parse(text);
      originalConsole.log(JSON.stringify(parsed, null, 2));
    } catch {
      // Not JSON or invalid JSON, print as-is
      originalConsole.log(text);
    }
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    originalConsole.error('Error:', error.message);
    process.exit(1);
  });
}

module.exports = { parseArgs, main };
