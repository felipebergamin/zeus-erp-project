import { Router } from "express";
import { ChamadoTecnicoController } from "../controllers/ChamadoTecnicoController";

import cancelChamadoValidator = require("../validators/chamado-tecnico/cancel");
import createChamadoValidator = require("../validators/chamado-tecnico/create");

const router = Router();

router.route("/")
  .get(ChamadoTecnicoController.query)
  .post(createChamadoValidator, ChamadoTecnicoController.create);

router.route("/:id")
  .get(ChamadoTecnicoController.get)
  .put(ChamadoTecnicoController.update);

router.post("/finalizar/:id", ChamadoTecnicoController.finalize);
router.post("/cancelar/:id", cancelChamadoValidator, ChamadoTecnicoController.cancel);

export = router;
