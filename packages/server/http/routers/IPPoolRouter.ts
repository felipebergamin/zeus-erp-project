import { Router } from "express";
import { IPPoolController } from "../controllers/IPPoolController";

import { RepositoryIPPool } from "../../services/repository/repository-ip-pool";
import createPoolValidator = require("../validators/ip-pool/create");

const router = Router();

const repoIPPool = new RepositoryIPPool();
const controller = new IPPoolController(repoIPPool);

router.route("/")
  .get(controller.query)
  .post(createPoolValidator, controller.create);

router.route("/:id")
  .get(controller.get)
  .put(createPoolValidator, controller.update)
  .delete(controller.delete);

export = router;
