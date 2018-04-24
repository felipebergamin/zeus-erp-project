import { Request, Response } from 'express';

import { NotFoundError } from '../../errors/NotFoundError';
import { LogService as log } from '../../services/LogService';
import { RepositoryLancamentosEstoque } from '../../services/repository/repository-lancamentos-estoque';
import { handleError } from '../utils/HttpControllers';

export class LancamentoEstoqueController {
  constructor(
    private lancamentoEstoqueRepo: RepositoryLancamentosEstoque,
  ) {}

  public async create(req: Request, res: Response) {
    try {
      const lancamento = await this.lancamentoEstoqueRepo.create({
        criadoPor: req.user._id,
        ...req.body,
      });

      log.info(`fez um lançamento no estoque`, req.user._id, lancamento._id);
      res.json(lancamento);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fields, populate } = req.query;

      const lancamento = await this.lancamentoEstoqueRepo.get(id, { fields, populate });

      if (lancamento) {
        return res.json(lancamento);
      }

      throw new NotFoundError('Lançamento não encontrado');
    } catch (err) {
      handleError(err, res);
    }
  }

  public async query(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;

      const result = await this.lancamentoEstoqueRepo.getAll(search, { fields, populate });
      res.json(result);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await this.lancamentoEstoqueRepo.remove(id);

      if (deleted) {
        log.info(`removeu um lançamento do estoque`, req.user._id, deleted._id);
        return res.json(deleted);
      }

      throw new Error('Houve um erro ao deletar o lançamento do estoque');
    } catch (err) {
      handleError(err, res);
    }
  }

}
