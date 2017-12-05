import { Router } from 'express';
import { InstalacaoController } from '../controllers/InstalacaoController';

const router = Router();

router.route('/')
  .get(InstalacaoController.getAll)
  .post(InstalacaoController.create);

router.route('/:id')
  .get(InstalacaoController.get)
  .put(InstalacaoController.update)
  .delete(InstalacaoController.remove);

export = router;
