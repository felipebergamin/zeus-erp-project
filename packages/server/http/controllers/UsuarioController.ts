import { Request, Response } from 'express';
import { LogService as log } from '../../services/LogService';
import { RepositoryUsuario } from '../../services/repository/repository-usuario';
import * as utils from "../utils/HttpControllers";
import { handleError } from '../utils/HttpControllers';

export class UsuarioController {
  constructor(private repoUsuario: RepositoryUsuario) {}

  public async create(req: Request, res: Response) {
    try {
      const usuario = await this.repoUsuario.create(req.body);
      res.json(usuario);
      log.info(`criou o usuário ${usuario.login}, IP: ${req.ip}`, req.user._id, usuario._id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;

      const searchResult = await this.repoUsuario.getAll(search, { fields, populate });
      res.json(searchResult);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { fields, populate } = req.query;
      const { id } = req.params;

      const usuario = await this.repoUsuario.get(id, { fields, populate });
      res.json(usuario);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const updated = await this.repoUsuario.update(id, req.body);

      if (!updated) {
        res.status(204).end();
      }

      const { result, modifiedPaths } = updated;
      res.json(result);
      log.info(`modificou ${modifiedPaths} no usuário ${result.login}, IP: ${req.ip}`, req.user._id, result._id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await this.repoUsuario.remove(id);
      res.json(deleted);
      log.info(`desativou o usuário ${deleted.login}, IP: ${req.ip}`, req.user._id, deleted._id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async recover(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const recovered = await this.repoUsuario.recover(id);
      res.json(recovered);

      log.info(`ativou o usuário ${recovered.login}, IP: ${req.ip}`,
        req.user._id,
        recovered._id);
    } catch (err) {
      handleError(err, res);
    }
  }
}
