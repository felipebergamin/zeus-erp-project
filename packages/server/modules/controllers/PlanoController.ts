import Plano = require('../../db/model/Plano');
import { Request, Response } from 'express';

export class PlanoController {

  static async create (req: Request, res: Response) {
    try {
      res.send(await Plano.create(req.body));
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async get (req: Request, res: Response) {
    try {
      res.json(await Plano.findById(req.params.id).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async getAll (req: Request, res: Response) {
    try {
      res.json(await Plano.find({}).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async update (req: Request, res: Response) {
    try {
      const values = {
        alterado_em: Date.now(),
      };
      Object.assign(values, req.body);

      res.json(await Plano.findByIdAndUpdate(
        req.params.id,
        { $set: values },
        { new: true, runValidators: true },
      ).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async remove (req: Request, res: Response) {
    try {
      res.json(await Plano.findByIdAndRemove(req.params.id).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }
}