import { Router } from "express";
import { OLTController } from "../controllers/OLTController";

import createOltValidator = require("../validators/olt/create");

const router = Router();

router.route("/")
  .post(createOltValidator, createOltValidator, OLTController.create)
  .get(OLTController.getAll);

router.route("/:id")
  .put(createOltValidator, OLTController.update)
  .get(OLTController.get)
  .delete(OLTController.delete);

export = router;
