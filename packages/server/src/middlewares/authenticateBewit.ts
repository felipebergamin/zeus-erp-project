import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as Hawk from 'hawk';

import db from '../models';

const searchCredentials = (id) => {
  return db.Usuario.findById(id, {attributes: ['_id', 'key']})
    .then(user => {
      if (!user) throw new Error('User Not Found');

      return {
        key: user.get('key'),
        algorithm: 'sha256',
      };
    });
};

export const authenticateBewit = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('auth bewit');
      await Hawk.uri.authenticate(req, searchCredentials);
      console.log('bewit auth ok');
      next();
    } catch (err) {
      res.status(401).send('Acesso não autorizado');
    }
  };
};
