import { Schema } from "mongoose";
import randomstring = require("randomstring");

export function plugin(schema: Schema) {
  schema.pre("save", function genProtocol(next) {
    const carne = this;

    carne.set("idCarne", randomstring.generate({
      charset: "alphanumeric",
      length: 10,
      readable: true,
    }));
    next();
  });
}
