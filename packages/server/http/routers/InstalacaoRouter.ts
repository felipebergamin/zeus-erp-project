import { Request, Response, Router } from 'express';
import { InstalacaoController } from '../controllers/InstalacaoController';

import { RepositoryInstalacao } from '../../services/repository/repository-instalacao';
import cancelarInstalacaoValidator = require("../validators/instalacao/cancelar");
import createInstalacaoValidator = require("../validators/instalacao/create");

const router = Router();

const repoInstalacao = new RepositoryInstalacao();
const controller = new InstalacaoController(repoInstalacao);

router.route('/')
  .get((req: Request, res: Response) => controller.getAll(req, res))
  .post(createInstalacaoValidator, (req: Request, res: Response) => controller.create(req, res));

router.route('/:id')
  .get((req: Request, res: Response) => controller.get(req, res))
  .put(createInstalacaoValidator, (req: Request, res: Response) => controller.update(req, res));

router.post("/cancelar/:id", cancelarInstalacaoValidator, (req: Request, res: Response) => controller.cancel(req, res));
router.post("/concluir/:id", (req: Request, res: Response) => controller.complete(req, res));

export = router;
