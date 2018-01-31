import { Router } from "express";
import { IPPoolController } from "../controllers/IPPoolController";

const router = Router();

router.route("/")
  .get(IPPoolController.query)
  .post(IPPoolController.create);

router.route("/:id")
  .get(IPPoolController.get)
  .put(IPPoolController.update)
  .delete(IPPoolController.delete);

export = router;
