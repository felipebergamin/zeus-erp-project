import { Request, Response, Router } from "express";
import { OLTController } from "../controllers/OLTController";

import { RepositoryOLT } from "../../services/repository/repository-olt";
import createOltValidator = require("../validators/olt/create");

const router = Router();

const repoOlt = new RepositoryOLT();
const controller = new OLTController(repoOlt);

router.route("/")
  .post(createOltValidator, createOltValidator, (req: Request, res: Response) => controller.create(req, res))
  .get((req: Request, res: Response) => controller.getAll(req, res));

router.route("/:id")
  .put(createOltValidator, (req: Request, res: Response) => controller.update(req, res))
  .get((req: Request, res: Response) => controller.get(req, res))
  .delete((req: Request, res: Response) => controller.delete(req, res));

export = router;
