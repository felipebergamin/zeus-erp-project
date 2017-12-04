const moment = require('moment');

module.exports = (date) => {
  const startDate = (date instanceof Date ? date : new Date(date));
  const endDate = new Date();

  const diff = endDate.getTime() - startDate.getTime();
  return moment.duration(diff).years() >= 18;
};
