import moment = require("moment");
import mongoose = require("../connection");

export function plugin(schema: mongoose.Schema) {
  schema.pre("save", function genProtocol(next) {
    const chamado = this;

    const now = moment();
    const dayInit = moment([now.year(), now.month(), now.date()]);
    const msDiff = now.valueOf() - dayInit.valueOf();

    const protocolo = now.format("YYYYMMDD") + msDiff;
    chamado.set("protocolo", protocolo);
    next();
  });
}
