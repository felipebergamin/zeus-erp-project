import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';

const router = Router();

router.route('/')
  .post(LoginController.checkLogin);

export = router;
