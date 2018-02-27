import { Request, Response } from "express";
import moment = require("moment");
import "moment/locale/pt-br";
moment.locale("pt-BR");

import { LogService as log } from "../../services/LogService";
import { RepositoryChamadoTecnico } from "../../services/repository/repository-chamado-tecnico";
import { handleError } from "../utils/HttpControllers";

export class ChamadoTecnicoController {
  constructor(private repoChamado: RepositoryChamadoTecnico) { }

  public async create(req: Request, res: Response) {
    try {
      const chamado = await this.repoChamado.create({
        ...req.body,
        abertoPor: req.user._id,
      });

      res.status(201).json(chamado);
      log.info(`criou o chamado ${chamado.protocolo}, IP: ${req.ip}`, req.user._id, chamado._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { fields, populate } = req.query;
      const { id } = req.params;
      const chamado = await this.repoChamado.get(id);
      res.json(chamado);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async query(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const chamados = await this.repoChamado.getAll(this.parseQuery(search), { fields, populate });
      res.json(chamados);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await this.repoChamado.update(id, req.body);

      if (updated) {
        const { result, modifiedPaths } = updated;
        log.info(`alterou ${modifiedPaths} no chamado ${result.protocolo}, IP: ${req.ip}`, req.user._id, result._id);
        return res.json(result);
      }

      res.status(204).send();
    } catch (err) {
      handleError(err, res);
    }
  }

  public async cancel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { motivoCancelamento } = req.body;
      const canceladoPor = req.user._id;

      const chamado = await this.repoChamado.cancel(id, motivoCancelamento, canceladoPor);
      res.json(chamado);
      log.info(`cancelou o chamado ${chamado.protocolo}, IP: ${req.ip}`, req.user._id, chamado._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async finalize(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { imagemAssinatura, justificativaFechamento } = req.body;

      const chamado = await this.repoChamado.finalize(req.params.id, imagemAssinatura, justificativaFechamento);

      res.json(chamado);
      log.info(`finalizou o chamado ${chamado.protocolo}, IP: ${req.ip}`, req.user._id, chamado._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  private parseQuery(expressQuery: any): any {
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
