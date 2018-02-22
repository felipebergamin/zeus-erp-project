import { Router } from 'express';

import { RepositoryPlano } from '../../services/repository/repository-plano';
import { PlanoController } from '../controllers/PlanoController';
import createPlanoValidator = require("../validators/plano/create");

const router = Router();

const repoPlano = new RepositoryPlano();
const controller = new PlanoController(repoPlano);

router.route('/')
  .get(controller.getAll)
  .post(createPlanoValidator, controller.create);

router.route('/:id')
  .get(controller.get)
  .put(createPlanoValidator, controller.update)
  .delete(controller.remove);

export = router;
