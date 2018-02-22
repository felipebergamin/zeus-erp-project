import { Request, Response } from 'express';
import jwt = require('jwt-simple');

import { LoginService } from "../../services/LoginService";
import { RepositoryUsuario } from '../../services/repository/repository-usuario';

const repoUsuario = new RepositoryUsuario();
const loginService = new LoginService(repoUsuario);

export = async (req: Request, res: Response, next: (arg?: any) => void) => {
  const token = req.headers['x-access-token'] as string;

  if (token) {
    try {
      const decoded = loginService.decode(token);

      if (decoded.expires < Date.now()) {
        return res.status(401).send();
      }

      req.user = await repoUsuario.get(decoded.iss, { populate: 'perfil' });

      return next();
    } catch (err) {
      res.status(401).send();
    }
  } else {
    res.status(401).send();
  }
};
