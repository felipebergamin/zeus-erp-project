import { Router } from 'express';
import { PlanoController } from '../controllers/PlanoController';

import createPlanoValidator = require("../validators/plano/create");

const router = Router();

router.route('/')
  .get(PlanoController.getAll)
  .post(createPlanoValidator, PlanoController.create);

router.route('/:id')
  .get(PlanoController.get)
  .put(createPlanoValidator, PlanoController.update)
  .delete(PlanoController.remove);

export = router;
