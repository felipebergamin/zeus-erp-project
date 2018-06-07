import { Router } from 'express';

import { RepositoryBaixaEstoque } from '../../services/repository/repository-baixa-estoque';
import { RepositoryItemEstoque } from '../../services/repository/repository-item-estoque';
import { RepositoryLancamentosEstoque } from '../../services/repository/repository-lancamentos-estoque';
import { ItemEstoqueController } from '../controllers/item-estoque-controller';

const repoBaixaEstoque = new RepositoryBaixaEstoque();
const repoLancamentoEstoque = new RepositoryLancamentosEstoque();
const repoItemEstoque = new RepositoryItemEstoque(repoLancamentoEstoque, repoBaixaEstoque);

const controller = new ItemEstoqueController(repoItemEstoque);

const router = Router();

router.route('/')
  .post((req, res) => controller.create(req, res))
  .get((req, res) => controller.query(req, res));

router.route('/:id')
  .get((req, res) => controller.get(req, res))
  .put((req, res) => controller.update(req, res));

export = router;
