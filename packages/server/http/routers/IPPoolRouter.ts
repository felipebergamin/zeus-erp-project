import { Router } from "express";
import { IPPoolController } from "../controllers/IPPoolController";

import createPoolValidator = require("../validators/ip-pool/create");

const router = Router();

router.route("/")
  .get(IPPoolController.query)
  .post(createPoolValidator, IPPoolController.create);

router.route("/:id")
  .get(IPPoolController.get)
  .put(createPoolValidator, IPPoolController.update)
  .delete(IPPoolController.delete);

export = router;
