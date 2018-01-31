import { Router } from "express";
import { OLTController } from "../controllers/OLTController";

const router = Router();

router.route("/")
  .post(OLTController.create)
  .get(OLTController.getAll);

router.route("/:id")
  .put(OLTController.update)
  .get(OLTController.get)
  .delete(OLTController.delete);

export = router;
