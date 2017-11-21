const validator = require('ipv4-calculator/dist/validators');

module.exports = ip=>validator.isIpValid(ip);