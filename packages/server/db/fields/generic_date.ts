import * as moment from "moment";

export = {
  type: Date,
  validate: {
    message: "A data é inválida!",
    validator: (date: Date) => moment(date).isValid(),
  },
};
