const moment = require('moment');

module.exports = date => moment.duration(date.getTime()).years() >= 18;