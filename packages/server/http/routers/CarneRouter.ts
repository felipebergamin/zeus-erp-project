import { Router } from 'express';
import { CarneController } from '../controllers/CarneController';

const router = Router();

router.route('/')
  .get(CarneController.getAll)
  .post(CarneController.create);

router.route('/query')
  .post(CarneController.query);

router.route('/:id')
  .get(CarneController.get)
  .delete(CarneController.remove);

export = router;
