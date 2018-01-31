import mongoose = require("./db/connection");
import debug = require("./debug");

/* SYSTEM SERVICES */
import expressApp = require("./express-server");
import { FiberhomeService } from "./services/FiberhomeService";

import { setupApplication } from "./first-run-helper";
setupApplication();

/* START SERVICES */
FiberhomeService.instance();
expressApp.listen(3000, () => debug("server listening"));
