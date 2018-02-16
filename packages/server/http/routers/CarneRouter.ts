import { Router } from 'express';
import { CarneController } from '../controllers/CarneController';

import createCarneValidator = require("../validators/carne/create");

const router = Router();
const controller = new CarneController();

router.route('/')
  .get(controller.getAll)
  .post(createCarneValidator, controller.create);

router.route('/:id')
  .get(controller.get)
  .delete(controller.remove);

export = router;
