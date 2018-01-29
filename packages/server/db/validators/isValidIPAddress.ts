import nodeip = require("ip");

export function isValidIPAddress(ip: string) {
  return ip === null || nodeip.isV4Format(ip);
}
