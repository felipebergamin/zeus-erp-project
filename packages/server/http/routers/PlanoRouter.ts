import { Request, Response, Router } from 'express';

import { RepositoryPlano } from '../../services/repository/repository-plano';
import { PlanoController } from '../controllers/PlanoController';
import createPlanoValidator = require("../validators/plano/create");

const router = Router();

const repoPlano = new RepositoryPlano();
const controller = new PlanoController(repoPlano);

router.route('/')
  .get((req: Request, res: Response) => controller.getAll(req, res))
  .post(createPlanoValidator, (req: Request, res: Response) => controller.create(req, res));

router.route('/:id')
  .get((req: Request, res: Response) => controller.get(req, res))
  .put(createPlanoValidator, (req: Request, res: Response) => controller.update(req, res))
  .delete((req: Request, res: Response) => controller.remove(req, res));

export = router;
