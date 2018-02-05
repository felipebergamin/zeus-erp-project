import { Router } from 'express';
import { InstalacaoController } from '../controllers/InstalacaoController';

import cancelarInstalacaoValidator = require("../validators/instalacao/cancelar");
import createInstalacaoValidator = require("../validators/instalacao/create");

const router = Router();

router.route('/')
  .get(InstalacaoController.getAll)
  .post(createInstalacaoValidator, InstalacaoController.create);

router.route('/:id')
  .get(InstalacaoController.get)
  .put(createInstalacaoValidator, InstalacaoController.update);

router.post("/cancelar/:id", cancelarInstalacaoValidator, InstalacaoController.cancel);
router.post("/concluir/:id", InstalacaoController.complete);

export = router;
