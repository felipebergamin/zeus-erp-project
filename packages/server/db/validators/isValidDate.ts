import moment = require("moment");

export function isValidDate(date: Date): boolean {
  return moment.isDate(date);
}
