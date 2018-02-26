import { Request, Response } from 'express';

import { LogService as log } from '../../services/LogService';
import { RepositoryContaBancaria } from "../../services/repository/repository-conta-bancaria";
import * as utils from '../utils/HttpControllers';

export class ContaBancariaController {
  constructor(private repoCB: RepositoryContaBancaria) {}

  public async create(req: Request, res: Response) {
    try {
      const conta = await this.repoCB.create(req.body);
      res.status(201).json(conta);
      log.info(`criou a conta bancária ${conta.nome}`, req.user._id, conta._id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contaBancaria = await this.repoCB.get(id);
      res.json(contaBancaria);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;
      const contas = await this.repoCB.getAll(search, { fields, populate });
      res.json(contas);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await this.repoCB.update(id, req.body);

      if (!updated) {
        return res.status(204).end();
      }

      const { result, modifiedPaths } = updated;
      res.json(result);
      log.info(`alterou ${modifiedPaths} na conta bancária ${result.nome}`, req.user._id, result._id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const removed = await this.repoCB.remove(id);

      res.json(removed);
      log.info(`excluiu a conta bancária ${removed.nome}`, req.user._id, removed._id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }

  public async recover(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const recovered = await this.repoCB.recover(id);
      res.json(recovered);
      log.info(`restaurou a conta bancária ${recovered.nome}, IP: ${req.ip}`, req.user._id, recovered._id);
    } catch (err) {
      utils.handleError(err, res);
    }
  }
}
