import { Router } from "express";
import { PerfilUsuarioController } from "../controllers/PerfilUsuarioController";

import { RepositoryPerfilUsuario } from "../../services/repository/repository-perfil-usuario";
import createPerfilUsuario = require("../validators/perfil-usuario/create");

const router = Router();

const repoPerfil = new RepositoryPerfilUsuario();
const controller = new PerfilUsuarioController(repoPerfil);

router.route('/')
  .get(controller.getAll)
  .post(createPerfilUsuario, controller.create);

router.route('/:id')
  .get(controller.get)
  .put(createPerfilUsuario, controller.update)
  .delete(controller.delete);

export = router;
