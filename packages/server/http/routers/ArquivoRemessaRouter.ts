import { Request, Response, Router } from 'express';

import { Remessa } from "../../services/CNABService";
import { RepositoryArquivoRemessa } from "../../services/repository/repository-arquivo-remessa";
import { RepositoryBoleto } from '../../services/repository/repository-boleto';
import { RepositoryContaBancaria } from '../../services/repository/repository-conta-bancaria';
import { ArquivoRemessaController } from "../controllers/ArquivoRemessaController";

const router = Router();
const repoRemessa = new RepositoryArquivoRemessa();
const repoBoleto = new RepositoryBoleto();
const repoContaBancaria = new RepositoryContaBancaria();
const remessaService = new Remessa(repoRemessa, repoBoleto, repoContaBancaria);

const controller = new ArquivoRemessaController(remessaService, repoContaBancaria, repoRemessa);

router.route('/')
  .get((req: Request, res: Response) => controller.getAll(req, res))
  .post((req: Request, res: Response) => controller.create(req, res));

router.get('/download/:id', (req: Request, res: Response) => controller.download(req, res));

router.route('/:id')
  .get((req: Request, res: Response) => controller.get(req, res));

export = router;
