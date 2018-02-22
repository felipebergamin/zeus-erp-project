import { Request, Response } from "express";

import { LogService as log } from "../../services/LogService";
import { RepositoryIPPool } from "../../services/repository/repository-ip-pool";
import { aplyGetRequestOptionsToQuery, createQueryAndApplyReqOptions, handleError } from "../utils/HttpControllers";

export class IPPoolController {
  constructor(private repoIPPool: RepositoryIPPool) {}

  public async create(req: Request, res: Response) {
    try {
      const ippool = await this.repoIPPool.create(req.body);
      res.json(ippool);
      log.info(`criou o pool ${ippool.nome}, IP: ${req.ip}`, req.user._id, ippool._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const pool = await this.repoIPPool.get(req.params.id);
      res.json(pool);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async query(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const pools = await this.repoIPPool.getAll(this.parseQuery(search), { fields, populate });
      res.json(pools);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await this.repoIPPool.update(id, req.body);

      if (!updated) {
        return res.status(204).end();
      }

      const { result, modifiedPaths } = updated;

      log.info(`alterou ${modifiedPaths} no pool ${result.nome}, IP: ${req.ip}`, req.user._id, result._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const removed = await this.repoIPPool.remove(req.params.id);
      log.info(`deletou o pool ${removed.nome}, IP: ${req.ip}`, req.user._id, removed._id);
      res.json(removed);
    } catch (err) {
      handleError(err, res);
    }
  }

  private parseQuery(query: any = {}): any {
    const { nome, ...mongoQuery } = query;

    if (nome) {
      mongoQuery.nome = new RegExp(nome, 'i');
    }

    return mongoQuery;
  }
}
