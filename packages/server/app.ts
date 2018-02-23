import dotenv = require("dotenv");
dotenv.config();

import db = require("./db/initConnection");
import debug = require("./debug");

/* SYSTEM SERVICES */
import expressApp = require("./express-server");
import { FiberhomeService } from "./services/FiberhomeService";

import { setupApplication } from "./first-run-helper";

async function start() {
  try {
    await db;
    setupApplication();

    /* START SERVICES */
    FiberhomeService.instance();
    expressApp.listen(3000, () => debug("server listening"));
  } catch (err) {
    debug(err.name + "\n" + err.stack);
    process.exit(1);
  }
}

start();
