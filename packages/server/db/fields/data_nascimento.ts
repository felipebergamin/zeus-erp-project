import { isOfAge } from "../validators/isOfAge";
import { isDate } from "../validators/isValidDate";

export = {
  required: [true, 'Está faltando a data de nascimento!'],
  type: Date,
  validate: [
    {
      message: 'A data é inválida!',
      validator: isDate,
    },
    {
      message: 'Menor de 18 anos!',
      validator: isOfAge,
    },
  ],
};
