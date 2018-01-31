import { Router } from 'express';
import { ContaBancariaController } from '../controllers/ContaBancariaController';

const router = Router();

router.route('/')
  .get(ContaBancariaController.getAll)
  .post(ContaBancariaController.create);

router.route('/:id')
  .get(ContaBancariaController.get)
  .put(ContaBancariaController.update)
  .delete(ContaBancariaController.remove);

export = router;
