import { Schema } from "mongoose";

export = {
  ref: 'Plano',
  required: [true, 'Plano de assinatura não definido!'],
  type: Schema.Types.ObjectId,
};
