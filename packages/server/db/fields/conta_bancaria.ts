import { Schema } from "mongoose";

export = {
  ref: 'ContaBancaria',
  required: [true, 'Especifique a conta bancária'],
  type: Schema.Types.ObjectId,
};
