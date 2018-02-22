import { Router } from 'express';
import { InstalacaoController } from '../controllers/InstalacaoController';

import { RepositoryInstalacao } from '../../services/repository/repository-instalacao';
import cancelarInstalacaoValidator = require("../validators/instalacao/cancelar");
import createInstalacaoValidator = require("../validators/instalacao/create");

const router = Router();

const repoInstalacao = new RepositoryInstalacao();
const controller = new InstalacaoController(repoInstalacao);

router.route('/')
  .get(controller.getAll)
  .post(createInstalacaoValidator, controller.create);

router.route('/:id')
  .get(controller.get)
  .put(createInstalacaoValidator, controller.update);

router.post("/cancelar/:id", cancelarInstalacaoValidator, controller.cancel);
router.post("/concluir/:id", controller.complete);

export = router;
