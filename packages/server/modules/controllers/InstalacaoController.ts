import Instalacao = require('../../db/model/Instalacao');
import { Request, Response } from 'express';

export class InstalacaoController {
  static async create (req: Request, res: Response) {
    try {
      res.json(await Instalacao.create(req.body));
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async get (req: Request, res: Response) {
    try {
      res.json(await Instalacao.findById(req.params.id).exec());
    } catch (err) {
      res.status(400).send(err);
    }
  }

  static async getAll (req: Request, res: Response) {
    try {
      res.json(await Instalacao.find({}).populate('cliente').populate('tecnico_responsavel').exec());
    } catch (err) {
      res.status(400).send(err);
    }
  }

  static async update (req: Request, res: Response) {
    try {
      const newData = {
        alterado_em: Date.now(),
        ...req.body,
      };

      res.json(await Instalacao.findByIdAndUpdate(
        req.params.id,
        { $set: newData },
        { new: true, runValidators: true },
      ).exec());
    } catch (err) {
      res.status(400).send(err);
    }
  }

  static async remove (req: Request, res: Response) {
    try {
      res.send(await Instalacao.findByIdAndRemove(req.params.id).exec());
    } catch (err) {
      res.status(400).send(err);
    }
  }
};