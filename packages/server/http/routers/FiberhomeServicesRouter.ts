import { Request, Response, Router } from "express";

import { FiberhomeService } from "../../services/FiberhomeService";
import { FiberhomeController } from "../controllers/FiberhomeController";

import addOnuValidator = require("../validators/fiberhome/addOnu");
import configureOnuValidator = require("../validators/fiberhome/configureOnu");
import getOnuInfoValidator = require("../validators/fiberhome/getOnuInfo");
import getUnauthOnuValidator = require("../validators/fiberhome/getUnauthOnu");

const router = Router();

router.get("/onuinfo", getOnuInfoValidator, FiberhomeController.getOnuInfo);
router.get("/getunauthonu", getUnauthOnuValidator, FiberhomeController.getUnauthorizedOnu);
router.post("/addonu", addOnuValidator, FiberhomeController.addOnu);
router.post("/configureonu", configureOnuValidator, FiberhomeController.configureOnu);

export = router;
