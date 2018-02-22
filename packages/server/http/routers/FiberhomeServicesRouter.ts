import { Request, Response, Router } from "express";

import { FiberhomeService } from "../../services/FiberhomeService";
import { FiberhomeController } from "../controllers/FiberhomeController";

import { RepositoryOLT } from "../../services/repository/repository-olt";
import addOnuValidator = require("../validators/fiberhome/addOnu");
import configureOnuValidator = require("../validators/fiberhome/configureOnu");
import getOnuInfoValidator = require("../validators/fiberhome/getOnuInfo");
import getUnauthOnuValidator = require("../validators/fiberhome/getUnauthOnu");

const router = Router();

const repoOlt = new RepositoryOLT();
const controller = new FiberhomeController(repoOlt);

router.get("/onuinfo",
  getOnuInfoValidator,
  (req: Request, res: Response) => controller.getOnuInfo(req, res));

router.get("/getunauthonu",
  getUnauthOnuValidator,
  (req: Request, res: Response) => controller.getUnauthorizedOnu(req, res));

router.post("/addonu",
  addOnuValidator,
  (req: Request, res: Response) => controller.addOnu(req, res));

router.post("/configureonu",
  configureOnuValidator,
  (req: Request, res: Response) => controller.configureOnu(req, res));

export = router;
