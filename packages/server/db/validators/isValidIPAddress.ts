import nodeip = require("ip");

export function isValidIPAddress(ip: string) {
  return nodeip.isV4Format(ip);
}
