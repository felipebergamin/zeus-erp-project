import { Request, Response } from 'express';
import Usuario = require('../../db/model/Usuario');

export class UsuarioController {

  public static async create(req: Request, res: Response) {
    try {
      res.json(await Usuario.create(req.body));
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      res.json(await Usuario.find({}).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
