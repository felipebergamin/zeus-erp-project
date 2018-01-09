import { Request, Response } from 'express';
import Plano = require('../../db/model/Plano');
import { LogService as log } from "../services/LogService";
import { aplyGetRequestOptionsToQuery, createQueryAndApplyReqOptions, handleError } from "../utils/HttpControllers";

export class PlanoController {

  public static async create(req: Request, res: Response) {
    try {
      const plano = await new Plano(req.body);
      plano.set("criadoEm", new Date());
      res.json(await plano.save());

      log.info(`criou o plano ${plano.get("nome")}<${plano.id}>, IP: ${req.ip}`, req.user._id, plano.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const query = Plano.findById(req.params.id);
      aplyGetRequestOptionsToQuery(req, query);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const query = createQueryAndApplyReqOptions(req, Plano);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const plano = await Plano.findById(req.params.id).exec();
      plano.set(req.body);
      const modificado = plano.modifiedPaths().join(",");
      plano.set("alteradoEm", new Date());
      await plano.save();

      res.json(plano);

      log.info(`modificou ${modificado} no plano ${plano.get("nome")}<${plano.id}>, IP: ${req.ip}`,
        req.user._id, plano.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const plano = await Plano.findByIdAndRemove(req.params.id).exec();

      if (!plano) {
        throw new Error("Não existe um plano com o ID especificado");
      }

      await plano.remove();
      res.json(plano.toJSON());
      log.info(`excluiu o plano ${plano.get("nome")}, IP: ${req.ip}`, req.user._id, plano.id);
    } catch (err) {
      handleError(err, res);
    }
  }
}
