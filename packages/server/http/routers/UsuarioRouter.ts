import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

import createUsuarioValidator = require("../validators/usuario/create");

const router = Router();

router.route('/')
  .get(UsuarioController.getAll)
  .post(createUsuarioValidator, UsuarioController.create);

router.route('/:id')
  .delete(UsuarioController.delete)
  .get(UsuarioController.getById)
  .put(createUsuarioValidator, UsuarioController.update);

router.post("/recover/:id", UsuarioController.recover);

export = router;
