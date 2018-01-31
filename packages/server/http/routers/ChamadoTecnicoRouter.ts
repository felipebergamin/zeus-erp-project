import { Router } from "express";
import { ChamadoTecnicoController } from "../controllers/ChamadoTecnicoController";

const router = Router();

router.route("/")
  .get(ChamadoTecnicoController.query)
  .post(ChamadoTecnicoController.create);

router.route("/:id")
  .get(ChamadoTecnicoController.get)
  .put(ChamadoTecnicoController.update);

router.post("/finalizar/:id", ChamadoTecnicoController.finalize);
router.post("/cancelar/:id", ChamadoTecnicoController.cancel);

export = router;
