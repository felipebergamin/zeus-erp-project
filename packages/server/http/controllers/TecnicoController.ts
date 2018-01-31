import { Request, Response } from 'express';
import Tecnico = require('../../db/model/Tecnico');

export class TecnicoController {
  public static async create(req: Request, res: Response) {
    try {
      res.json(await Tecnico.create(req.body));
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      res.json(await Tecnico.findById(req.params.id).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      res.json(await Tecnico.find({}).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const values = {
        alterado_em: Date.now(),
        ...req.body,
      };

      res.json(await Tecnico.findByIdAndUpdate(
        req.params.id,
        { $set: values },
        { new: true, runValidators: true },
      ).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      res.json(await Tecnico.findByIdAndRemove(req.params.id));
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
