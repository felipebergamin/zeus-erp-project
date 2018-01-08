import randomstring = require("randomstring");
import { Schema } from "../connection";

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
