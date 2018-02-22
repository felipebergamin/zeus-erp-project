import { Request, Response, Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

import { RepositoryCliente } from '../../services/repository/repository-cliente';
import createClientValidator = require("../validators/cliente/create");
import updateClientValidator = require("../validators/cliente/update");

const router = Router();
const repoCliente = new RepositoryCliente();
const controller = new ClienteController(repoCliente);

router.route('/')
  .get((req: Request, res: Response) => controller.getAll(req, res))
  .post(createClientValidator, (req: Request, res: Response) => controller.create(req, res));

router.route('/recover/:id')
  .post((req: Request, res: Response) => controller.undelete(req, res));

router.route('/removed')
  .get((req: Request, res: Response) => controller.getRemoved(req, res));

router.route('/:id')
  .get((req: Request, res: Response) => controller.get(req, res))
  .delete((req: Request, res: Response) => controller.remove(req, res))
  .put(updateClientValidator, (req: Request, res: Response) => controller.update(req, res));

export = router;
