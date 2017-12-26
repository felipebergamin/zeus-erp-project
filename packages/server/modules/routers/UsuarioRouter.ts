import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();

router.route('/')
  .get(UsuarioController.getAll)
  .post(UsuarioController.create);

router.route('/:id')
  .delete(UsuarioController.delete)
  .get(UsuarioController.getById)
  .put(UsuarioController.update);

export = router;
