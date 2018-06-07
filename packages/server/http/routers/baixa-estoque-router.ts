import { Router } from 'express';

import { RepositoryBaixaEstoque } from '../../services/repository/repository-baixa-estoque';
import { RepositoryItemEstoque } from '../../services/repository/repository-item-estoque';
import { BaixaEstoqueController } from '../controllers/baixa-estoque-controller';

const repoBaixaEstoque = new RepositoryBaixaEstoque();
const controller = new BaixaEstoqueController(repoBaixaEstoque);

const router = Router();

router.route('/')
  .post((req, res) => controller.create(req, res))
  .get((req, res) => controller.query(req, res));

router.route('/:id')
  .get((req, res) => controller.get(req, res))
  .delete((req, res) => controller.delete(req, res));

export = router;
