import { Request, Response } from 'express';

import { NotFoundError } from '../../errors/NotFoundError';
import { LogService as log } from '../../services/LogService';
import { RepositoryBaixaEstoque } from '../../services/repository/repository-baixa-estoque';
import { handleError } from '../utils/HttpControllers';

export class BaixaEstoqueController {
  constructor(
    private baixaEstoqueRepo: RepositoryBaixaEstoque,
  ) {}

  public async create(req: Request, res: Response) {
    try {
      const baixa = await this.baixaEstoqueRepo.create({
        criadoPor: req.user._id,
        ...req.body,
      });

      log.info(`lançou uma baixa no estoque`, req.user._id, baixa._id);
      res.json(baixa);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fields, populate } = req.query;

      const baixa = await this.baixaEstoqueRepo.get(id, { fields, populate });

      if (baixa) {
        return res.json(baixa);
      }

      throw new NotFoundError('Baixa não encontrada');
    } catch (err) {
      handleError(err, res);
    }
  }

  public async query(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;

      const result = await this.baixaEstoqueRepo.getAll(search, { fields, populate });
      res.json(result);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await this.baixaEstoqueRepo.remove(id);

      if (deleted) {
        log.info(`removeu uma baixa do estoque`, req.user._id, deleted._id);
        return res.json(deleted);
      }

      throw new Error('Houve um erro ao deletar a baixa do estoque');
    } catch (err) {
      handleError(err, res);
    }
  }

}
