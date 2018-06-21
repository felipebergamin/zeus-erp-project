import { Request, Response, Router } from 'express';

import { RepositoryProblemaChamado } from '../../services/repository/repository-problema-chamado';
import { ProblemasChamadoController } from '../controllers/problemas-chamado.controller';

const controller = new ProblemasChamadoController(new RepositoryProblemaChamado());

const router = Router();

router.route('/')
  .post((req, res) => controller.create(req, res))
  .get((req, res) => controller.getAll(req, res));

router.route('/:id')
  .get((req, res) => controller.getById(req, res))
  .put((req, res) => controller.update(req, res));

export = router;
