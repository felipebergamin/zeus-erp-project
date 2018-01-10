import moment = require("moment");
import mongoose = require("../connection");

export function plugin(schema: mongoose.Schema, options: { opid: string } = { opid: "" }) {
  schema.pre("save", function genProtocol(next) {
    const document = this;

    const now = moment();
    const dayInit = moment([now.year(), now.month(), now.date()]);
    const msDiff = now.valueOf() - dayInit.valueOf();

    const protocolo = now.format("YYYYMMDD") + options.opid + msDiff;
    document.set("protocolo", protocolo);
    next();
  });
}
