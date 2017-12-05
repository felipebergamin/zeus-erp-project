import { Router } from 'express';
import { TecnicoController } from '../controllers/TecnicoController';

const router = Router();

router.route('/')
  .get(TecnicoController.getAll)
  .post(TecnicoController.create);

router.route('/:id')
  .get(TecnicoController.get)
  .put(TecnicoController.update)
  .delete(TecnicoController.remove);

export = router;
