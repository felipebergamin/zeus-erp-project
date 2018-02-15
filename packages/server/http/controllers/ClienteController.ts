import { Request, Response } from 'express';

import { Document, DocumentQuery } from '../../db/connection';
import Cliente = require('../../db/model/Cliente');
import { LogService as log } from "../../services/LogService";
import { aplyGetRequestOptionsToQuery, createQueryAndApplyReqOptions, handleError } from "../utils/HttpControllers";

import { RepositoryCliente } from "../../repository/repository-cliente";

const repositoryCliente = new RepositoryCliente();

export class ClienteController {
  public static async create(req: Request, res: Response) {
    try {
      const cliente = await repositoryCliente.create(req.body);
      res.json(cliente);
      log.info(`cadastrou o cliente ${cliente.nome}, IP: ${req.ip}`, req.user._id, cliente._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fields, populate } = req.query;

      const cliente = await repositoryCliente.get(id, { fields, populate });
      res.json(cliente);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const cliente = await repositoryCliente.getAll({
        ...ClienteController.parseQuery(search),
        excluido: false,
      }, { fields, populate });

      res.json(cliente);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async getRemoved(req: Request, res: Response) {
    try {
      const { fields, populate } = req.query;
      const clientes = repositoryCliente.getAll({
        excluido: true,
      }, { fields, populate });

      res.json(clientes);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { result, modifiedPaths } = await repositoryCliente.update(id, req.body);
      res.json(result);
      log.info(`modificou ${modifiedPaths} no cliente ${result.nome}, IP: ${req.ip}`, req.user._id, result._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const cliente = await repositoryCliente.remove(id);
      res.json(cliente);
      log.info(`excluiu o cliente ${cliente.nome}, IP: ${req.ip}`, req.user._id, cliente._id);
    } catch (err) {
      handleError(err, res);
    }
  }

  public static async undelete(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const cliente = await repositoryCliente.get(id);

      const { result } = await repositoryCliente.update(id, {
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

  private static parseQuery(searchQuery: any = {}) {
    const { nome, ...mongoQuery } = searchQuery;

    if (nome) {
      mongoQuery.$text = {
        $search: nome,
      };
    }

    return mongoQuery;
  }
}
