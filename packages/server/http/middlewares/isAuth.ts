import { Request, Response } from 'express';
import jwt = require('jwt-simple');
import Usuario = require('../../db/model/Usuario');
import { LoginController } from '../controllers/LoginController';

export = async (req: Request, res: Response, next: (arg?: any) => void) => {
  const token = req.headers['x-access-token'] as string;

  if (token) {
    try {
      const decoded = LoginController.decode(token);

      if (decoded.expires < Date.now()) {
        return res.status(401).send();
      }

      req.user = await Usuario.findById(decoded.iss).exec();

      return next();
    } catch (err) {
      res.status(401).send();
    }
  } else {
    res.status(401).send();
  }
};
