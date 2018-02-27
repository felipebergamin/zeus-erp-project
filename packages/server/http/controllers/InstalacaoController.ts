import { Request, Response } from "express";

import { LogService as log } from "../../services/LogService";
import { RepositoryInstalacao } from "../../services/repository/repository-instalacao";
import { aplyGetRequestOptionsToQuery, createQueryAndApplyReqOptions, handleError } from "../utils/HttpControllers";

export class InstalacaoController {
  constructor(private repoInstalacao: RepositoryInstalacao) {}

  public async create(req: Request, res: Response) {
    try {
      const instalacao = await this.repoInstalacao.create(req.body);
      res.json(instalacao);
      log.info(`criou a instalacao ${instalacao.protocolo}, IP: ${req.ip}`, req.user._id, instalacao._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const instalacao = await this.repoInstalacao.get(req.params.id);
      res.json(instalacao);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const queryResult = await this.repoInstalacao.getAll(search, { fields, populate });
      res.json(queryResult);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await this.repoInstalacao.update(id, data);

      if (!updated) {
        return res.status(204).end();
      }

      const { result, modifiedPaths } = updated;

      res.json(result);
      log.info(`modificou a instalacao ${result.protocolo}, IP: ${req.ip}`, req.user._id, result._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async cancel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { motivoCancelamento } = req.body;

      const cancelled = await this.repoInstalacao.cancel(id, motivoCancelamento);

      log.info(`cancelou a instalacao ${cancelled.protocolo}, IP: ${req.ip}`, req.user._id, cancelled._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async complete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const completed = await this.repoInstalacao.complete(id);
      log.info(`concluiu a instalacao ${completed.protocolo}, IP: ${req.ip}`, req.user._id, completed._id);
    } catch (err) {
      handleError(err, res);
    }
  }
}
