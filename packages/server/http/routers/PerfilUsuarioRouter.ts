import { Request, Response, Router } from "express";
import { PerfilUsuarioController } from "../controllers/PerfilUsuarioController";

import { RepositoryPerfilUsuario } from "../../services/repository/repository-perfil-usuario";
import createPerfilUsuario = require("../validators/perfil-usuario/create");

const router = Router();

const repoPerfil = new RepositoryPerfilUsuario();
const controller = new PerfilUsuarioController(repoPerfil);

router.route('/')
  .get((req: Request, res: Response) => controller.getAll(req, res))
  .post(createPerfilUsuario, (req: Request, res: Response) => controller.create(req, res));

router.route('/:id')
  .get((req: Request, res: Response) => controller.get(req, res))
  .put(createPerfilUsuario, (req: Request, res: Response) => controller.update(req, res))
  .delete((req: Request, res: Response) => controller.delete(req, res));

export = router;
