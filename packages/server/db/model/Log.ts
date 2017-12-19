import { model } from "mongoose";
import LogSchema = require("../schema/LogSchema");

export = model("Log", LogSchema);
