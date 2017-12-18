import { Router } from 'express';
import { BoletoBancarioController } from '../controllers/BoletoBancarioController';

const router = Router();

router.route('/')
  .get(BoletoBancarioController.getAll)
  .post(BoletoBancarioController.create);

router.route('/:id')
  .get(BoletoBancarioController.get)
  .put(BoletoBancarioController.update)
  .delete(BoletoBancarioController.remove);

router.route('/query')
  .post(BoletoBancarioController.query);

export = router;
