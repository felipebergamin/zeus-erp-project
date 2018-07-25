import * as moment from 'moment';

export function generateProtocol(idLetter: string = 'Z'): string {
  const now = moment();
  const dayInit = moment([now.year(), now.month(), now.date()]);
  const msDiff = now.valueOf() - dayInit.valueOf();

  return now.format("YYYYMMDD") + idLetter + msDiff;
}
