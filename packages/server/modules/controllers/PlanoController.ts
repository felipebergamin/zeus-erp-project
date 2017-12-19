import Plano = require('../../db/model/Plano');
import { Request, Response } from 'express';
import { LogService as log } from "../services/LogService";

export class PlanoController {

  static async create (req: Request, res: Response) {
    try {
      const plano = await new Plano(req.body).save();
      res.json(plano);

      log.info(`criou o plano ${plano.get("nome")}<${plano.id}>, IP: ${req.ip}`, req.user._id, plano.id);
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

      const plano = await Plano.findById(req.params.id).exec();
      plano.set(req.body);
      const modificado = plano.modifiedPaths().join(",");
      plano.set("alterado_em", new Date());
      await plano.save();

      res.json(plano);

      log.info(`modificou ${modificado} no plano ${plano.get("nome")}<${plano.id}>, IP: ${req.ip}`,
        req.user._id, plano.id);
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
