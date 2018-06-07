import { Request, Response, Router } from 'express';
import { RepositoryItemEstoque } from '../../services/repository/repository-item-estoque';
import { RepositoryLancamentosEstoque } from '../../services/repository/repository-lancamentos-estoque';
import { LancamentoEstoqueController } from '../controllers/lancamento-estoque-controller';

const repoLancamentosEstoque = new RepositoryLancamentosEstoque();
const controller = new LancamentoEstoqueController(repoLancamentosEstoque);

const router = Router();

router.route('/')
  .get((req, res) => controller.query(req, res))
  .post((req, res) => controller.create(req, res));

router.route('/:id')
  .get((req, res) => controller.get(req, res))
  .delete((req, res) => controller.delete(req, res));

export = router;
