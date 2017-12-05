import * as moment from 'moment';

module.exports = {
  type: Date,
  validate: {
    validator: (date: Date) => moment(date).isValid(),
    message: 'A data é inválida!',
  },
};
