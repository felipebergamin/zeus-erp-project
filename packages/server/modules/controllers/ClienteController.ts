import Client = require('../../db/model/Cliente');
import { Request, Response } from 'express';

export class ClienteController {
  
  static async create (req: Request, res: Response) {
    try {
      res.json(await Client.create(req.body));
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async get (req: Request, res: Response) {
    try {
      res.send(await Client.findById(req.params.id)
        .populate('signature_plan')
        .exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async getAll (req: Request, res: Response) {
    try {
      res.json(await Client.find({ excluido_em: { $exists: false } }).populate('plano').exec());
    } catch (err) {
      res.json(err);
    }
  }

  static async getRemoved (req: Request, res: Response) {
    try {
      res.json(await Client.find({ excluido_em: { $exists: true } }).exec());
    } catch (err) {
      res.status(400).send(err);
    }
  }

  static async update (req: Request, res: Response) {
    try {
      res.json(await Client.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true },
      ).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async remove (req: Request, res: Response) {
    try {
      res.send(await Client.findByIdAndUpdate(
        req.params.id,
        { $set: { excluido_em: Date.now() } },
      ).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async undelete (req: Request, res: Response) {
    try {
      const updateQuery = {
        $unset: { excluido_em: '' },
        $set: { alterado_em: Date.now() },
      };

      res.json(await Client.findByIdAndUpdate(req.params.id, updateQuery).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  }
};
