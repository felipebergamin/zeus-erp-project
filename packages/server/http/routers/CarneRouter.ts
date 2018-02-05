import { Router } from 'express';
import { CarneController } from '../controllers/CarneController';

import createCarneValidator = require("../validators/carne/create");

const router = Router();

router.route('/')
  .get(CarneController.getAll)
  .post(createCarneValidator, CarneController.create);

router.route('/:id')
  .get(CarneController.get)
  .delete(CarneController.remove);

export = router;
