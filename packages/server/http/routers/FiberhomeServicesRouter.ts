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

router.get("/onuinfo", getOnuInfoValidator, controller.getOnuInfo);
router.get("/getunauthonu", getUnauthOnuValidator, controller.getUnauthorizedOnu);
router.post("/addonu", addOnuValidator, controller.addOnu);
router.post("/configureonu", configureOnuValidator, controller.configureOnu);

export = router;
