import { Schema } from "../connection";

export = {
  ref: 'ContaBancaria',
  required: [true, 'Especifique a conta bancária'],
  type: Schema.Types.ObjectId,
};
