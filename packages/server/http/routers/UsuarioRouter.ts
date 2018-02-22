import { Request, Response, Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

import { RepositoryUsuario } from "../../services/repository/repository-usuario";
import createUsuarioValidator = require("../validators/usuario/create");

const router = Router();

const repoUsuario = new RepositoryUsuario();
const controller = new UsuarioController(repoUsuario);

router.route('/')
  .get((req: Request, res: Response) => controller.getAll(req, res))
  .post(createUsuarioValidator, (req: Request, res: Response) => controller.create(req, res));

router.route('/:id')
  .delete((req: Request, res: Response) => controller.delete(req, res))
  .get((req: Request, res: Response) => controller.getById(req, res))
  .put(createUsuarioValidator, (req: Request, res: Response) => controller.update(req, res));

router.post("/recover/:id", (req: Request, res: Response) => controller.recover(req, res));

export = router;
