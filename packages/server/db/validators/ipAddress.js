const validator = require('ipv4-calculator/dist/validators');

module.exports = ip => ip === null || validator.isIpValid(ip);
