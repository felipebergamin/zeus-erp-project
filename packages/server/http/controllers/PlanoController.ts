import { Request, Response } from 'express';

import { LogService as log } from "../../services/LogService";
import { RepositoryPlano } from '../../services/repository/repository-plano';
import { handleError } from "../utils/HttpControllers";

export class PlanoController {
  constructor(private repoPlano: RepositoryPlano) {}

  public async create(req: Request, res: Response) {
    try {
      const plano = await this.repoPlano.create(req.body);
      res.json(plano);
      log.info(`criou o plano ${plano.nome}, IP: ${req.ip}`, req.user._id, plano._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const plano = await this.repoPlano.get(req.params.id);
      res.json(plano);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const searchResult = await this.repoPlano.getAll(search, { fields, populate });
      res.json(searchResult);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params.id;
      const updated = await this.repoPlano.update(id, req.body);

      if (!updated) {
        return res.status(204).end();
      }

      const { result, modifiedPaths } = updated;

      res.json(result);
      log.info(`modificou ${modifiedPaths} no plano ${result.nome}, IP: ${req.ip}`, req.user._id, result._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const plano = await this.repoPlano.remove(id);

      res.json(plano);

      log.info(`excluiu o plano ${plano.nome}, IP: ${req.ip}`, req.user._id, plano._id);
    } catch (err) {
      handleError(err, res);
    }
  }
}
