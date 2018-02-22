import { Request, Response, Router } from 'express';

import { LoginService } from '../../services/LoginService';
import { RepositoryUsuario } from '../../services/repository/repository-usuario';
import { LoginController } from '../controllers/LoginController';

const router = Router();

const repoUsuario = new RepositoryUsuario();
const loginService = new LoginService(repoUsuario);
const controller = new LoginController(loginService);

router.route('/')
  .post((req, res) => controller.checkLogin(req, res));

export = router;
