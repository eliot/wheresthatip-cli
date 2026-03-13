# wheresthatip

IP geolocation from the command line. Look up any IP address to get city, country, ISP, and coordinates.

```
$ wheresthatip

  IP            203.0.113.42
  City          San Francisco
  State         California
  Country       United States
  ISP           Comcast Cable Communications
  Coordinates   37.7749, -122.4194

  Details: https://www.wheresthatip.com/ip/203.0.113.42
```

## Install

```bash
npm install -g wheresthatip
```

## Usage

### Show your public IP and location

```bash
wheresthatip
```

### Look up any IP address

```bash
wheresthatip 8.8.8.8
wheresthatip 1.1.1.1
```

### Output as JSON

```bash
wheresthatip --json
wheresthatip 8.8.8.8 --json
```

```json
{
  "ip": "8.8.8.8",
  "city": "Mountain View",
  "state": "California",
  "country": "United States",
  "isp": "Google LLC",
  "latitude": 37.386,
  "longitude": -122.0838
}
```

### Get just the IP (for scripting)

```bash
wheresthatip --raw
# 203.0.113.42

# Use in scripts:
MY_IP=$(wheresthatip --raw)
```

## Use as a library

```javascript
const { myip, lookup } = require('wheresthatip');

// Get your public IP
const ip = await myip();
console.log(ip); // "203.0.113.42"

// Look up any IP
const info = await lookup('8.8.8.8');
console.log(info.country); // "United States"
console.log(info.city);    // "Mountain View"
console.log(info.isp);     // "Google LLC"
```

## API

### `myip()`

Returns a `Promise<string>` with your public IP address.

### `lookup(ip)`

Returns a `Promise<Object>` with geolocation data:

| Field | Type | Description |
|-------|------|-------------|
| `ip` | string | The IP address |
| `city` | string | City name |
| `state` | string | State/region name |
| `country` | string | Country name |
| `isp` | string | Internet Service Provider |
| `latitude` | number | Latitude coordinate |
| `longitude` | number | Longitude coordinate |
| `postal` | string | Postal/ZIP code |

## Options

| Flag | Description |
|------|-------------|
| `-j, --json` | Output as JSON |
| `-r, --raw` | Output IP address only |
| `-h, --help` | Show help |
| `-v, --version` | Show version |

## Powered by

[WheresThatIP.com](https://www.wheresthatip.com) — Free IP geolocation, network tools, and privacy resources.

- [What Is My IP?](https://www.wheresthatip.com) — See your public IP and location
- [IP Lookup](https://www.wheresthatip.com/lookup) — Look up any IP address
- [DNS Lookup](https://www.wheresthatip.com/tools/dns) — Query DNS records
- [Ping Test](https://www.wheresthatip.com/tools/ping) — Test connectivity
- [Best VPNs](https://www.wheresthatip.com/vpns/best) — Protect your IP with a VPN

## License

MIT
