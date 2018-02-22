import { Router } from "express";
import { OLTController } from "../controllers/OLTController";

import { RepositoryOLT } from "../../services/repository/repository-olt";
import createOltValidator = require("../validators/olt/create");

const router = Router();

const repoOlt = new RepositoryOLT();
const controller = new OLTController(repoOlt);

router.route("/")
  .post(createOltValidator, createOltValidator, controller.create)
  .get(controller.getAll);

router.route("/:id")
  .put(createOltValidator, controller.update)
  .get(controller.get)
  .delete(controller.delete);

export = router;
