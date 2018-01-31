import { Request, Response, Router } from "express";

import { FiberhomeService } from "../../services/FiberhomeService";
import { FiberhomeController } from "../controllers/FiberhomeController";

const router = Router();

router.get("/onuinfo", FiberhomeController.getOnuInfo);
router.get("/getunauthonu", FiberhomeController.getUnauthorizedOnu);
router.post("/addonu", FiberhomeController.addOnu);
router.post("/configureonu", FiberhomeController.configureOnu);

export = router;
