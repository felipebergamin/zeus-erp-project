import { Router } from "express";
import { LogController } from "../controllers/LogController";

const router = Router();

const controller = new LogController();

router.route("/")
  .get(controller.query);

router.route("/:id")
  .get(controller.get);

export = router;
