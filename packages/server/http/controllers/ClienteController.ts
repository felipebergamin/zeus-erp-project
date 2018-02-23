import { Request, Response } from 'express';

import { Document, DocumentQuery } from "mongoose";
import { LogService as log } from "../../services/LogService";
import { aplyGetRequestOptionsToQuery, createQueryAndApplyReqOptions, handleError } from "../utils/HttpControllers";

import { RepositoryCliente } from "../../services/repository/repository-cliente";

export class ClienteController {
  constructor(private repoCliente: RepositoryCliente) {}

  public async create(req: Request, res: Response) {
    try {
      const cliente = await this.repoCliente.create(req.body);
      res.json(cliente);
      log.info(`cadastrou o cliente ${cliente.nome}, IP: ${req.ip}`, req.user._id, cliente._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fields, populate } = req.query;

      const cliente = await this.repoCliente.get(id, { fields, populate });
      res.json(cliente);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const cliente = await this.repoCliente.getAll({
        ...this.parseQuery(search),
        excluido: false,
      }, { fields, populate });

      res.json(cliente);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async getRemoved(req: Request, res: Response) {
    try {
      const { fields, populate } = req.query;
      const clientes = await this.repoCliente.getAll({
        excluido: true,
      }, { fields, populate });

      res.json(clientes);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { result, modifiedPaths } = await this.repoCliente.update(id, req.body);
      res.json(result);
      log.info(`modificou ${modifiedPaths} no cliente ${result.nome}, IP: ${req.ip}`, req.user._id, result._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const cliente = await this.repoCliente.remove(id);
      res.json(cliente);
      log.info(`excluiu o cliente ${cliente.nome}, IP: ${req.ip}`, req.user._id, cliente._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async undelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cliente = await this.repoCliente.get(id);

      const { result } = await this.repoCliente.update(id, {
        ...cliente,
        excluido: false,
        excluidoEm: undefined,
      });

      res.json(result);
      log.info(`restaurou o cliente ${result.nome}, IP: ${req.ip}`, req.user._id, result._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  private parseQuery(searchQuery: any = {}) {
    const { nome, ...mongoQuery } = searchQuery;

    if (nome) {
      mongoQuery.$text = {
        $search: nome,
      };
    }

    return mongoQuery;
  }
}
