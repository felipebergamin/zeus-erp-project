import moment = require('moment');

module.exports = (date: Date) => moment(date).isSameOrAfter(Date.now());
