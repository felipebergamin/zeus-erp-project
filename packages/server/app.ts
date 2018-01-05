import mongoose = require("./db/connection");
import debug = require("./debug");

/* SYSTEM SERVICES */
import expressApp = require("./express-server");
import { FiberhomeService } from "./modules/services/FiberhomeService";

/* START SERVICES */
FiberhomeService.instance();
expressApp.listen(3000, () => debug("server listening"));
