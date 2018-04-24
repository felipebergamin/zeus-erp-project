import { Router } from 'express';

import { RepositoryItemEstoque } from '../../services/repository/repository-item-estoque';
import { ItemEstoqueController } from '../controllers/item-estoque-controller';

const controller = new ItemEstoqueController(new RepositoryItemEstoque());

const router = Router();

router.route('/')
  .post((req, res) => controller.create(req, res))
  .get((req, res) => controller.query(req, res));

router.route('/:id')
  .get((req, res) => controller.get(req, res))
  .put((req, res) => controller.update(req, res));

export = router;
