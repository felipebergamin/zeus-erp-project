import BoletoBancario = require('../../db/model/BoletoBancario');
import { Request, Response } from 'express';

export class BoletoBancarioController {
  static async create (req: Request, res: Response) {
    try {
      res.json(await BoletoBancario.create(req.body));
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async get (req: Request, res: Response) {
    try {
      res.json(await BoletoBancario.findById(req.params.id).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async getAll (req: Request, res: Response) {
    try {
      res.json(await BoletoBancario.find({}).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async update (req: Request, res: Response) {
    try {
      const newData = {
        alterado_em: Date.now(),
        ...req.body,
      };

      res.json(await BoletoBancario.findByIdAndUpdate(
        req.params.id,
        { $set: newData },
        { new: true, runValidators: true },
      ).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async remove (req: Request, res: Response) {
    try {
      const newData = {
        excluido_em: Date.now(),
      };

      res.json(await BoletoBancario.findByIdAndUpdate(
        req.params.id,
        { $set: newData },
        { new: true, runValidators: true },
      ).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
