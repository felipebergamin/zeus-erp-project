import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

import { RepositoryUsuario } from "../../services/repository/repository-usuario";
import createUsuarioValidator = require("../validators/usuario/create");

const router = Router();

const repoUsuario = new RepositoryUsuario();
const controller = new UsuarioController(repoUsuario);

router.route('/')
  .get(controller.getAll)
  .post(createUsuarioValidator, controller.create);

router.route('/:id')
  .delete(controller.delete)
  .get(controller.getById)
  .put(createUsuarioValidator, controller.update);

router.post("/recover/:id", controller.recover);

export = router;
