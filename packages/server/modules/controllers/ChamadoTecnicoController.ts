import { Request, Response } from "express";
import moment = require("moment");
import "moment/locale/pt-br";
moment.locale("pt-BR");

import Chamado = require("../../db/model/ChamadoTecnico");
import { LogService as log } from "../services/LogService";
import { aplyGetRequestOptionsToQuery,
  createQueryAndApplyReqOptions,
  handleError } from "../utils/HttpControllers";

export class ChamadoTecnicoController {

  public static async create(req: Request, res: Response) {
    try {
      const chamado = new Chamado(req.body);
      chamado.set("abertoPor", req.user._id);
      await chamado.save();
      res.json(chamado.toJSON());
      log.info(`criou o chamado ${chamado.get("protocolo")}, IP: ${req.ip}`, req.user._id, chamado.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const query = Chamado.findById(req.params.id);
      aplyGetRequestOptionsToQuery(req, query);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async query(req: Request, res: Response) {
    try {
      const query = createQueryAndApplyReqOptions(req, Chamado, ChamadoTecnicoController.parseQuery);
      res.json(await query.exec());
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      // impede que informações sensíveis sejam alteradas livremente
      const {
        alteradoEm,
        criadoEm,
        cancelado,
        canceladoEm,
        canceladoPor,
        motivoCancelamento,
        finalizado,
        finalizadoEm,
        imagemAssinatura,
        justificativaFechamento,
        abertoPor,
        cliente,
        protocolo,
        ...newData, // apenas as propriedades restantes podem ser modificadas
      } = req.body;

      const user = req.user;
      const chamado = await Chamado.findById(req.params.id).exec();
      chamado.set(newData);

      // se nenhuma informação foi modificada, retorna o objeto
      // evita escrita desnecessária no banco de dados
      if (!chamado.isModified()) {
        return res.json(chamado);
      }

      const modified = chamado.modifiedPaths().join(", ");
      chamado.set("alteradoEm", new Date());
      await chamado.save();
      res.json(chamado);
      log.info(`alterou ${modified} no chamado ${chamado.get("protocolo")}, IP: ${req.ip}`, user._id, chamado.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async cancel(req: Request, res: Response) {
    try {
      const { motivoCancelamento } = req.body;

      if (typeof motivoCancelamento !== "string") {
        throw new Error("Deve ser informada uma justificativa para fechar o chamado");
      }
      if (motivoCancelamento.length < 10) {
        throw new Error("A justificativa para fechar o chamado é inválida!");
      }

      const chamado = await Chamado.findById(req.params.id).exec();

      if (chamado.get("finalizado")) {
        throw new Error("Impossível cancelar um chamado finalizado");
      }
      if (chamado.get("cancelado")) {
        throw new Error("O chamado já foi cancelado");
      }

      chamado.set({
        cancelado: true,
        canceladoEm: new Date(),
        canceladoPor: req.user._id,
        motivoCancelamento,
      });
      await chamado.save();
      res.json(chamado);
      log.info(`cancelou o chamado ${chamado.get("protocolo")}, IP: ${req.ip}`, req.user._id, chamado.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async finalize(req: Request, res: Response) {
    try {
      const user = req.user;
      const { imagemAssinatura, justificativaFechamento } = req.body;

      if (typeof imagemAssinatura !== "string" || !imagemAssinatura.endsWith("=")) {
        throw new Error("Assinatura do cliente não recolhida!");
      }
      if (typeof justificativaFechamento !== "string" || justificativaFechamento.length < 10) {
        throw new Error("É necessário informar uma justificativa para o fechamento do chamado");
      }

      const chamado = await Chamado.findById(req.params.id).exec();

      if (chamado.get("finalizado")) {
        throw new Error("Chamado já finalizado");
      }
      if (chamado.get("cancelado")) {
        throw new Error("Impossível finalizar um chamado cancelado");
      }

      chamado.set({
        finalizado: true,
        finalizadoEm: new Date(),
        imagemAssinatura,
        justificativaFechamento,
      });

      await chamado.save();
      res.json(chamado);
      log.info(`finalizou o chamado ${chamado.get("protocolo")}, IP: ${req.ip}`, user._id, chamado.id);
    } catch (err) {
      handleError(err, res);
    }
  }

  private static parseQuery(expressQuery: any): any {
    if (!expressQuery) {
      return {};
    }
    const mongooseQuery = {} as any;

    if ("minDate" in expressQuery && "maxDate" in expressQuery) {
      mongooseQuery.criadoEm = {
        $gte: moment(expressQuery.minDate).hour(0).minute(0).second(0).milliseconds(0),
        $lte: moment(expressQuery.maxDate).hour(23).minute(59).second(59).milliseconds(999),
      };
      delete expressQuery.minDate;
      delete expressQuery.maxDate;
    }

    return {
      ...expressQuery,
      ...mongooseQuery,
    };
  }
}
