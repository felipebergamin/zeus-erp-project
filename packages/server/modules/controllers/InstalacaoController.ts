import { Request, Response } from "express";

import Instalacao = require("../../db/model/Instalacao");
import { LogService as log } from "../services/LogService";
import { aplyGetRequestOptionsToQuery, createQueryAndApplyReqOptions, handleError } from "../utils/HttpControllers";

export class InstalacaoController {
  public static async create(req: Request, res: Response) {
    try {
      const instalacao = new Instalacao(req.body);
      await instalacao.save();
      res.json(instalacao.toJSON());
      log.info(`criou a instalacao ${instalacao.get("protocolo")}, IP: ${req.ip}`, req.user._id, instalacao.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const query = Instalacao.findById(req.params.id);
      aplyGetRequestOptionsToQuery(req, query);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const query = createQueryAndApplyReqOptions(req, Instalacao);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const instalacao = await Instalacao.findById(req.params.id).exec();
      const { tecnicoResponsavel } = req.body;

      if (!instalacao) {
        throw new Error(`Não foi encontrada uma instalação com id: ${req.params.id}`);
      }
      if (typeof tecnicoResponsavel !== "string" || tecnicoResponsavel.length === 0) {
        throw new Error("um técnico responsável pela instalação deve ser informado");
      }

      instalacao.set({
        alteradoEm: new Date(),
        tecnicoResponsavel,
      });
      await instalacao.save();
      res.json(instalacao.toJSON());
      log.info(`modificou a instalacao ${instalacao.get("protocolo")}, IP: ${req.ip}`, req.user._id, instalacao.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async cancel(req: Request, res: Response) {
    try {
      const instalacao = await Instalacao.findById(req.params.id).exec();
      const { motivoCancelamento } = req.body;

      if (!instalacao) {
        throw new Error(`Não existe instalação com id: ${req.params.id}`);
      }
      if (typeof motivoCancelamento !== 'string' || motivoCancelamento.length < 10) {
        throw new Error("O motivo do cancelamento é inválido!");
      }
      if (instalacao.get("cancelada") || instalacao.get("concluida")) {
        throw new Error("Impossível cancelar uma instalação já concluída ou cancelada!");
      }

      instalacao.set({
        cancelada: true,
        dataHoraCancelada: new Date(),
        motivoCancelamento,
      });
      await instalacao.save();
      res.json(instalacao);
      log.info(`cancelou a instalacao ${instalacao.get("protocolo")}, IP: ${req.ip}`, req.user._id, instalacao.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async complete(req: Request, res: Response) {
    try {
      const instalacao = await Instalacao.findById(req.params.id);

      if (!instalacao) {
        throw new Error(`Instalação com id ${req.params.id} não encontrada!`);
      }
      if (instalacao.get("cancelada") || instalacao.get("concluida")) {
        throw new Error("Impossível concluir uma instalação já concluída ou cancelada");
      }

      instalacao.set({
        concluida: true,
        dataHoraConclusao: new Date(),
      });

      await instalacao.save();
      res.json(instalacao.toJSON());
      log.info(`concluiu a instalacao ${instalacao.get("protocolo")}, IP: ${req.ip}`, req.user._id, instalacao.id);
    } catch (err) {
      handleError(err, res);
    }
  }
}
