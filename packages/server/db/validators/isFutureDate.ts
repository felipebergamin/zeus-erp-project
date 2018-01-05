import moment = require('moment');

export function isFutureDate(date: Date) {
  moment(date).isSameOrAfter(Date.now());
}
