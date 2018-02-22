import { Request, Response, Router } from "express";
import { LogController } from "../controllers/LogController";

const router = Router();

const controller = new LogController();

router.route("/")
  .get((req: Request, res: Response) => controller.query(req, res));

router.route("/:id")
  .get((req: Request, res: Response) => controller.get(req, res));

export = router;
