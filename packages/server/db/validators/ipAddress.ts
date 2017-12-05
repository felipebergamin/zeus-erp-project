const validator = require('ipv4-calculator/dist/validators');

module.exports = (ip: string) => ip === null || validator.isIpValid(ip);
