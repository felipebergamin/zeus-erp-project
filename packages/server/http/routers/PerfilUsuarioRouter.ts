import { Router } from "express";
import { PerfilUsuarioController } from "../controllers/PerfilUsuarioController";

import createPerfilUsuario = require("../validators/perfil-usuario/create");

const router = Router();

router.route('/')
  .get(PerfilUsuarioController.getAll)
  .post(createPerfilUsuario, PerfilUsuarioController.create);

router.route('/:id')
  .get(PerfilUsuarioController.get)
  .put(createPerfilUsuario, PerfilUsuarioController.update)
  .delete(PerfilUsuarioController.delete);

export = router;
