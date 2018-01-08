import { Schema } from "../connection";

export = {
  ref: 'Cliente',
  required: [true, 'O cliente deve ser especificado'],
  type: Schema.Types.ObjectId,
};
