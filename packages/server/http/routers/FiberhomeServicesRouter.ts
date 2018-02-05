import { Request, Response, Router } from "express";

import { FiberhomeService } from "../../services/FiberhomeService";
import { FiberhomeController } from "../controllers/FiberhomeController";

import getOnuInfoValidator = require("../validators/fiberhome/getOnuInfo");
import getUnauthOnuValidator = require("../validators/fiberhome/getUnauthOnu");

const router = Router();

router.get("/onuinfo", getOnuInfoValidator, FiberhomeController.getOnuInfo);
router.get("/getunauthonu", getUnauthOnuValidator, FiberhomeController.getUnauthorizedOnu);
router.post("/addonu", FiberhomeController.addOnu);
router.post("/configureonu", FiberhomeController.configureOnu);

export = router;
