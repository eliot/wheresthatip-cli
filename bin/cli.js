#!/usr/bin/env node

const { lookup, myip } = require('../lib/index');

const args = process.argv.slice(2);
const flags = args.filter(a => a.startsWith('-'));
const positional = args.filter(a => !a.startsWith('-'));

const jsonOutput = flags.includes('--json') || flags.includes('-j');
const rawOutput = flags.includes('--raw') || flags.includes('-r');
const helpFlag = flags.includes('--help') || flags.includes('-h');
const versionFlag = flags.includes('--version') || flags.includes('-v');

if (versionFlag) {
  const pkg = require('../package.json');
  console.log(pkg.version);
  process.exit(0);
}

if (helpFlag) {
  console.log(`
  wheresthatip - IP geolocation from the command line

  Usage:
    wheresthatip              Show your public IP and location
    wheresthatip <ip>         Look up any IP address
    wheresthatip --json       Output as JSON
    wheresthatip --raw        Output IP only (no location)

  Options:
    -j, --json      Output as JSON
    -r, --raw       Output IP address only
    -h, --help      Show this help
    -v, --version   Show version

  Examples:
    wheresthatip
    wheresthatip 8.8.8.8
    wheresthatip 1.1.1.1 --json
    wheresthatip --raw

  Powered by https://www.wheresthatip.com
`);
  process.exit(0);
}

async function main() {
  try {
    if (positional.length === 0) {
      // Show user's own IP
      const ip = await myip();

      if (rawOutput) {
        console.log(ip);
        return;
      }

      const info = await lookup(ip);

      if (jsonOutput) {
        console.log(JSON.stringify(info, null, 2));
        return;
      }

      printResult(info);
    } else {
      // Look up specified IP
      const ip = positional[0];
      const info = await lookup(ip);

      if (jsonOutput) {
        console.log(JSON.stringify(info, null, 2));
        return;
      }

      printResult(info);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

function printResult(info) {
  const lines = [
    ['IP', info.ip],
    ['City', info.city || 'Unknown'],
    ['State', info.state || 'Unknown'],
    ['Country', info.country || 'Unknown'],
    ['ISP', info.isp || 'Unknown'],
    ['Coordinates', info.latitude && info.longitude ? `${info.latitude}, ${info.longitude}` : 'Unknown'],
  ];

  const maxLabel = Math.max(...lines.map(([l]) => l.length));

  console.log();
  for (const [label, value] of lines) {
    console.log(`  ${label.padEnd(maxLabel + 2)} ${value}`);
  }
  console.log();
  console.log(`  Details: https://www.wheresthatip.com/ip/${info.ip}`);
  console.log();
}

main();
