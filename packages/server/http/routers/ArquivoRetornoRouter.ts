import { Request, Response, Router } from 'express';

import { Retorno } from '../../services/CNABService';
import { RepositoryArquivoRetorno } from '../../services/repository/repository-arquivo-retorno';
import { RepositoryBoleto } from '../../services/repository/repository-boleto';
import { ArquivoRetornoController } from '../controllers/ArquivoRetornoController';

const router = Router();

const repoRetorno = new RepositoryArquivoRetorno();
const retornoService = new Retorno(new RepositoryBoleto());
const controller = new ArquivoRetornoController(retornoService, repoRetorno);

router.route('/')
  .post((req, res) => controller.upload(req, res))
  .get((req, res) => controller.getAll(req, res));

router.route('/:id')
  .get((req, res) => controller.get(req, res));

router.route('/parse/:id')
  .get((req, res) => controller.parse(req, res));

router.route('/download/:id')
  .get((req, res) => controller.download(req, res));

export = router;
