import { Router } from "express";
import { ChamadoTecnicoController } from "../controllers/ChamadoTecnicoController";

import { RepositoryChamadoTecnico } from "../../services/repository/repository-chamado-tecnico";
import cancelChamadoValidator = require("../validators/chamado-tecnico/cancel");
import createChamadoValidator = require("../validators/chamado-tecnico/create");
import finalizeChamadoValidator = require("../validators/chamado-tecnico/finalize");

const controller = new ChamadoTecnicoController(new RepositoryChamadoTecnico());
const router = Router();

router.route("/")
  .get(controller.query)
  .post(createChamadoValidator, controller.create);

router.route("/:id")
  .get(controller.get)
  .put(controller.update);

router.post("/finalizar/:id", finalizeChamadoValidator, controller.finalize);
router.post("/cancelar/:id", cancelChamadoValidator, controller.cancel);

export = router;
