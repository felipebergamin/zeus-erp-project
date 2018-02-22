import { Request, Response, Router } from "express";
import { IPPoolController } from "../controllers/IPPoolController";

import { RepositoryIPPool } from "../../services/repository/repository-ip-pool";
import createPoolValidator = require("../validators/ip-pool/create");

const router = Router();

const repoIPPool = new RepositoryIPPool();
const controller = new IPPoolController(repoIPPool);

router.route("/")
  .get((req: Request, res: Response) => controller.query(req, res))
  .post(createPoolValidator, (req: Request, res: Response) => controller.create(req, res));

router.route("/:id")
  .get((req: Request, res: Response) => controller.get(req, res))
  .put(createPoolValidator, (req: Request, res: Response) => controller.update(req, res))
  .delete((req: Request, res: Response) => controller.delete(req, res));

export = router;
