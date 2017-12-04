const moment = require('moment');

module.exports = date => moment(date).isSameOrAfter(Date.now());
