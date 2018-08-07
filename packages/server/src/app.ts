import dotenv = require("dotenv");
dotenv.config();

import debug = require("./debug");
import db from './models';

/* SYSTEM SERVICES */
import app from './express-server';
import { FiberhomeService } from "./services/FiberhomeService";

async function start() {
  try {
    // await db;
    await db.sequelize.sync();

    app.listen({ port: 4000 }, () =>
      debug(`🚀 Server ready on port 4000`)
    );

    /* START SERVICES */
    FiberhomeService.instance();
    // expressApp.listen(3000, () => debug("server listening"));
  } catch (err) {
    debug(err.name + "\n" + err.stack);
    process.exit(1);
  }
}

start();
