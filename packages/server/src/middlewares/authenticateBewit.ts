import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as Hawk from 'hawk';

import db from '../models';

const searchCredentials = (id) => {
  return db.Usuario.findById(id, {attributes: ['_id', 'key']})
    .then((user) => {
      if (!user) throw new Error('User Not Found');

      return {
        algorithm: 'sha256',
        key: user.get('key'),
      };
    });
};

export const authenticateBewit = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Hawk.uri.authenticate(req, searchCredentials);
      next();
    } catch (err) {
      res.status(401).send('<h1>Acesso não autorizado</h1>');
    }
  };
};
