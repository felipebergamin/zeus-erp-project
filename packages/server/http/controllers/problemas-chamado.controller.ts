import { Request, Response } from "express";

import { NotFoundError } from "../../errors/NotFoundError";
import { IUsuario } from "../../interfaces/IUsuario";
import { LogService as log } from "../../services/LogService";
import { RepositoryProblemaChamado } from "../../services/repository/repository-problema-chamado";
import { handleError } from "../utils/HttpControllers";

export class ProblemasChamadoController {
  constructor(
    private repoProblemaChamado: RepositoryProblemaChamado,
  ) {}

  public async create(req: Request, res: Response) {
    try {
      const user = req.user;
      const problema = await this.repoProblemaChamado.create(req.body);

      res.json(problema);
      log.info(`adicionou um novo problema de chamado`, user, problema._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const problema = await this.repoProblemaChamado.get(req.params.id);

      if (!problema) throw new NotFoundError(`Problema com id ${req.params.id} não encontrado!`);

      res.json(problema);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const result = await this.repoProblemaChamado.getAll(search, { fields, populate });

      res.json(result);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async update({ params, body, user }: { params: any, body: any, user?: IUsuario }, res: Response) {
    try {
      const { id } = params;

      const { result, modifiedPaths } = await this.repoProblemaChamado.update(id, body);
      res.json(result);
      log.info(`modificou ${modifiedPaths} no problema de chamado ${result._id}`, user._id, result._id);
    } catch (err) {
      handleError(err, res);
    }
  }
}
