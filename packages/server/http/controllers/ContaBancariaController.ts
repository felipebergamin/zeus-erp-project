import { Request, Response } from 'express';
import ContaBancaria = require('../../db/model/ContaBancaria');

export class ContaBancariaController {

  public static async create(req: Request, res: Response) {
    try {
      res.json(await ContaBancaria.create(req.body));
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      res.json(await ContaBancaria.findById(req.params.id).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      res.json(await ContaBancaria.find({}).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const newData = {
        alterado_em: Date.now(),
        ...req.body,
      };

      res.json(await ContaBancaria.findByIdAndUpdate(
        req.params.id,
        { $set: newData },
        { runValidators: true },
      ).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const newData = {
        excluido_em: Date.now(),
      };

      res.json(await ContaBancaria.findByIdAndUpdate(
        req.params.id,
        { $set: newData },
        { runValidators: true },
      ).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
