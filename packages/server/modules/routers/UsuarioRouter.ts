import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();

router.route('/')
  .get(UsuarioController.getAll)
  .post(UsuarioController.create);

export = router;
