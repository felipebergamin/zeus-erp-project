import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

const router = Router();

router.route('/')
  .get(ClienteController.getAll)
  .post(ClienteController.create);

router.route('/recover/:id')
  .post(ClienteController.undelete);

router.route('/removed')
  .get(ClienteController.getRemoved);

router.route('/:id')
  .get(ClienteController.get)
  .delete(ClienteController.remove)
  .put(ClienteController.update);

export = router;
