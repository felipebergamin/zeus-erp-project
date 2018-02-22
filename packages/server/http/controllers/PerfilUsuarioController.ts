import { Request, Response } from "express";
import { LogService as log } from "../../services/LogService";
import { RepositoryPerfilUsuario } from "../../services/repository/repository-perfil-usuario";
import * as utils from "../utils/HttpControllers";

export class PerfilUsuarioController {
  constructor(private repoPerfilUsuario: RepositoryPerfilUsuario) {}

  public async create(req: Request, res: Response) {
    try {
      const perfil = await this.repoPerfilUsuario.create(req.body);
      res.json(perfil);
      log.info(`criou o perfil de usuário ${perfil.nome}, IP: ${req.ip}`, req.user._id, perfil._id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const searchResult = await this.repoPerfilUsuario.getAll(search, { fields, populate });
      res.json(searchResult);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const perfil = await this.repoPerfilUsuario.get(req.params.id);
      res.json(perfil);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const updated = await this.repoPerfilUsuario.update(req.params.id, req.body);

      if (!updated) {
        return res.status(204).end();
      }

      const { result, modifiedPaths } = updated;
      log.info(`alterou ${modifiedPaths} no perfil ${result.nome}, IP: ${req.ip}`, req.user._id, result._id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const perfil = await this.repoPerfilUsuario.remove(req.params.id);
      res.json(perfil);
      log.info(`removeu o perfil ${perfil.nome}, IP: ${req.ip}`, req.user._id, perfil._id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }
}
