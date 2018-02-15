import { Request, Response } from 'express';

import BoletoBancario = require('../../db/model/BoletoBancario');
import { LogService as log } from "../../services/LogService";
import { RepositoryBoleto } from "../../services/repository/repository-boleto";
import { handleError } from "../utils/HttpControllers";

const repositoryBoleto = new RepositoryBoleto();

export class BoletoBancarioController {
  public static async create(req: Request, res: Response) {
    try {
      const boleto = await repositoryBoleto.create(req.body);
      res.json(boleto);
      log.info(`adicionou o boleto ${boleto.numeroBoleto}, IP: ${req.ip}`, req.user._id, boleto._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const { fields, populate } = req.query;
      const boleto = await repositoryBoleto.get(req.params.id);

      if (!boleto) {
        return res.status(404).json({ message: "Boleto não encontrado" });
      }

      res.json(boleto);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async query(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const boletos = await repositoryBoleto.getAll({
        excluido: false,
        ...search,
      }, { fields, populate });

      res.json(boletos);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { result, modifiedPaths } = await repositoryBoleto.update(id, req.body);
      log.info(`alterou ${modifiedPaths} no boleto ${result.numeroBoleto}, IP: ${req.ip}`, req.user._id, result._id);

      res.json(result);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const boleto = await repositoryBoleto.remove(id);

      res.json(boleto);
      log.info(`removeu o boleto ${boleto.numeroBoleto}, IP ${req.ip}`, req.user._id, boleto._id);
    } catch (err) {
      handleError(err, res);
    }
  }
}
