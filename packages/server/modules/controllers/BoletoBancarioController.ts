import { Request, Response } from 'express';
import BoletoBancario = require('../../db/model/BoletoBancario');
import { LogService as log } from "../services/LogService";
import { aplyGetRequestOptionsToQuery, createQueryAndApplyReqOptions, handleError } from "../utils/HttpControllers";

export class BoletoBancarioController {
  public static async create(req: Request, res: Response) {
    try {
      const boleto = new BoletoBancario(req.body);
      boleto.set("criadoEm", new Date());
      await boleto.save();
      res.json(boleto.toJSON());
      log.info(`adicionou o boleto ${boleto.get("numeroBoleto")}, IP: ${req.ip}`, req.user._id, boleto.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const query = BoletoBancario.findById(req.params.id);
      aplyGetRequestOptionsToQuery(req, query);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async query(req: Request, res: Response) {
    try {
      const query = createQueryAndApplyReqOptions(req, BoletoBancario);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const boleto = await BoletoBancario.findById(req.params.id);
      boleto.set(req.body);
      const mod = boleto.modifiedPaths().join(", ");
      boleto.set("alteradoEm", new Date());
      await boleto.save();
      res.json(boleto.toJSON());
      log.info(`alterou ${mod} no boleto ${boleto.get("numeroBoleto")}, IP: ${req.ip}`, req.user._id, boleto.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const boleto = await BoletoBancario.findById(req.params.id);
      boleto.set({
        excluido: true,
        excluidoEm: new Date(),
      });
      boleto.save();
      res.json(boleto.toJSON());
      log.info(`removeu o boleto ${boleto.get("numeroBoleto")}, IP ${req.ip}`, req.user._id, boleto.id);
    } catch (err) {
      handleError(err, res);
    }
  }
}
