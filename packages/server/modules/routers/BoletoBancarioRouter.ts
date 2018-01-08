import { Router } from 'express';
import { BoletoBancarioController } from '../controllers/BoletoBancarioController';

const router = Router();

router.route('/')
  .get(BoletoBancarioController.query)
  .post(BoletoBancarioController.create);

router.route('/:id')
  .get(BoletoBancarioController.get)
  .put(BoletoBancarioController.update)
  .delete(BoletoBancarioController.remove);

export = router;
