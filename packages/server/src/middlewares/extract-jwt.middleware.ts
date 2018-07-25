import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { UsuarioInstance } from '../models/UsuarioModel';
import { JWT_SECRET } from '../util/utils';
import db from './../models';

export const exportJwtMiddleware = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authorization: string = req.get('authorization');
    const token: string = authorization ? authorization.split(' ')[1] : undefined;

    req['context'] = {};
    req['context']['authorization'] = authorization;

    if (!token) {
      return next();
    }

    jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
      if (err) { return next(); }

      db.Usuario.findById(decoded.sub, {
        attributes: ['_id', 'login']
      }).then((user: UsuarioInstance) => {

        if (user) {
          req['context']['authUser'] = {
            _id: user.get('_id'),
            login: user.get('login'),
          };
        }

        return next();
      });
    });
  };
};
