import moment = require("moment");

export const generateProtocol = (options: { opid: string } = { opid: "" }): string => {
  const now = moment();
  const dayInit = moment([now.year(), now.month(), now.date()]);
  const msDiff = now.valueOf() - dayInit.valueOf();

  return now.format("YYYYMMDD") + options.opid + msDiff;
};
