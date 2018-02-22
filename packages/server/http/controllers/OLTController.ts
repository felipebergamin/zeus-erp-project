import { Request, Response } from "express";

import { LogService as log } from "../../services/LogService";
import { RepositoryOLT } from "../../services/repository/repository-olt";
import { handleError } from "../utils/HttpControllers";

export class OLTController {
  constructor(private repoOlt: RepositoryOLT) {}

  public async create(req: Request, res: Response) {
    try {
      const olt = await this.repoOlt.create(req.body);
      res.json(olt);
      log.info(`criou a OLT ${olt.nome}, IP: ${req.ip}`, req.user._id, olt._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const olt = await this.repoOlt.get(req.params.id);
      res.json(olt);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const results = await this.repoOlt.getAll(search, { fields, populate });
      res.json(results);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const removed = await this.repoOlt.remove(req.params.id);
      res.json(removed);
      log.info(`removeu a OLT ${removed.nome}, IP: ${req.ip}`, req.user._id, removed._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const updated = await this.repoOlt.update(req.params.id, req.body);

      if (!updated) {
        return res.status(204).end();
      }

      const { result, modifiedPaths } = updated;
      log.info(`alterou ${modifiedPaths} na olt ${result.nome}, IP: ${req.ip}`, req.user._id, result._id);
    } catch (err) {
      handleError(err, res);
    }
  }
}
