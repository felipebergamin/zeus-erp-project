import { Request, Response, Router } from "express";

import { ChamadoTecnicoController } from "../controllers/ChamadoTecnicoController";

import cancelChamadoValidator = require("../validators/chamado-tecnico/cancel");
import createChamadoValidator = require("../validators/chamado-tecnico/create");
import finalizeChamadoValidator = require("../validators/chamado-tecnico/finalize");

import { RepositoryBoleto } from "../../services/repository/repository-boleto";
import { RepositoryChamadoTecnico } from "../../services/repository/repository-chamado-tecnico";
import { RepositoryCliente } from "../../services/repository/repository-cliente";
import { RepositoryProblemaChamado } from "../../services/repository/repository-problema-chamado";

const repoChamado = new RepositoryChamadoTecnico(
  new RepositoryProblemaChamado(),
  new RepositoryBoleto(),
  new RepositoryCliente(),
);

const controller = new ChamadoTecnicoController(repoChamado);
const router = Router();

router.route("/")
  .get((req: Request, res: Response) => controller.query(req, res))
  .post(createChamadoValidator, (req: Request, res: Response) => controller.create(req, res));

router.route("/:id")
  .get((req: Request, res: Response) => controller.get(req, res))
  .put((req: Request, res: Response) => controller.update(req, res));

router.post("/finalizar/:id", finalizeChamadoValidator, (req: Request, res: Response) => controller.finalize(req, res));
router.post("/cancelar/:id", cancelChamadoValidator, (req: Request, res: Response) => controller.cancel(req, res));

export = router;
