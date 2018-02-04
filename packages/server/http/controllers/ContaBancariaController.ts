import { Request, Response } from 'express';

import ContaBancaria = require('../../db/model/ContaBancaria');
import { LogService as log } from '../../services/LogService';
import * as utils from '../utils/HttpControllers';

export class ContaBancariaController {

  public static async create(req: Request, res: Response) {
    try {
      const conta = new ContaBancaria(req.body);
      await conta.save();
      res.json(conta);
      log.info(`criou a conta bancária ${conta.get("nome")}`, req.user._id, conta.id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const query = ContaBancaria.findById(req.params.id);
      utils.aplyGetRequestOptionsToQuery(req, query);
      res.json(await query.exec());
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const query = utils.createQueryAndApplyReqOptions(req, ContaBancaria);
      query.where("excluido", false);
      res.json(await query.exec());
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const conta = await ContaBancaria.findById(req.params.id).exec();
      conta.set(req.body);
      const modified = conta.modifiedPaths().join(", ");
      conta.set("alteradoEm", new Date());
      await conta.save();

      res.json(conta);
      log.info(`alterou ${modified} na conta bancária ${conta.get("nome")}`, req.user._id, conta.id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const conta = await ContaBancaria.findByIdAndUpdate(req.params.id, {
        excluido: true,
        excluidoEm: new Date(),
      }).exec();

      res.json(conta);
      log.info(`excluiu a conta bancária ${conta.get("nome")}`, req.user._id, conta.id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public static async recover(req: Request, res: Response) {
    try {
      const conta = await ContaBancaria.findById(req.params.id).exec();

      if (conta) {
        conta.set({
          excluido: false,
          excluidoEm: undefined,
        });

        await conta.save();
        res.json(conta);
        log.info(`restaurou a conta ${conta.get("nome")}`, req.user._id, conta.id);
      } else {
        res.status(404).json({ message: "Conta bancária não encontrada" });
      }
    } catch (err) {
      utils.handleError(err, res);
    }
  }
}
