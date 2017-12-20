import { Router } from "express";
import { LogController } from "../controllers/LogController";

const router = Router();

router.route("/")
  .get(LogController.query);

router.route("/:id")
  .get(LogController.get);

export = router;
