import { Router } from 'express';
import { PlanoController } from '../controllers/PlanoController';

const router = Router();

router.route('/')
  .get(PlanoController.getAll)
  .post(PlanoController.create);

router.route('/:id')
  .get(PlanoController.get)
  .put(PlanoController.update)
  .delete(PlanoController.remove);

export = router;
