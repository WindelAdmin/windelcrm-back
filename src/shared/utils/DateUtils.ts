import * as moment from 'moment';

export function now() {
  return moment().tz('America/Sao_Paulo').utcOffset(-3).format()
}
