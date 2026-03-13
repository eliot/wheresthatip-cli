const https = require('https');

const BASE_URL = 'https://www.wheresthatip.com';

/**
 * Make an HTTPS GET request and return the response body
 */
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          return;
        }
        resolve(data);
      });
    }).on('error', reject);
  });
}

/**
 * Get your public IP address
 * @returns {Promise<string>} Your public IP address
 *
 * @example
 * const { myip } = require('wheresthatip');
 * const ip = await myip();
 * console.log(ip); // "203.0.113.42"
 */
async function myip() {
  const ip = await get(`${BASE_URL}/ip`);
  return ip.trim();
}

/**
 * Look up geolocation information for an IP address
 * @param {string} ip - The IP address to look up
 * @returns {Promise<Object>} Geolocation data
 *
 * @example
 * const { lookup } = require('wheresthatip');
 * const info = await lookup('8.8.8.8');
 * console.log(info.country); // "United States"
 * console.log(info.city);    // "Mountain View"
 * console.log(info.isp);     // "Google LLC"
 */
async function lookup(ip) {
  const json = await get(`${BASE_URL}/api/lookup/${ip}`);
  try {
    return JSON.parse(json);
  } catch {
    // If the API doesn't return JSON yet, return basic info
    return { ip, raw: json };
  }
}

module.exports = { myip, lookup };
