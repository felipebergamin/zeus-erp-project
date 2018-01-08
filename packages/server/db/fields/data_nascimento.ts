import { isOfAge } from "../validators/isOfAge";
import { isValidDate } from "../validators/isValidDate";

export = {
  required: [true, 'Está faltando a data de nascimento!'],
  type: Date,
  validate: [
    {
      message: 'A data é inválida!',
      validator: isValidDate,
    },
    {
      message: 'Menor de 18 anos!',
      validator: isOfAge,
    },
  ],
};
