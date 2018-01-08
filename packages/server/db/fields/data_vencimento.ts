import { isFutureDate } from "../validators/isFutureDate";

export = {
  required: [true, 'Data de vencimento do boleto não informada!'],
  type: Date,
  validate: {
    message: 'O vencimento do boleto deve ser uma data no futuro!',
    validator: isFutureDate,
  },
};
