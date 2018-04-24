import { Request, Response } from 'express';

import { NotFoundError } from '../../errors/NotFoundError';
import { LogService as log } from '../../services/LogService';
import { RepositoryItemEstoque } from '../../services/repository/repository-item-estoque';
import { handleError } from '../utils/HttpControllers';

export class ItemEstoqueController {
  constructor(
    private itemEstoqueRepo: RepositoryItemEstoque,
  ) {}

  public async create(req: Request, res: Response) {
    try {
      const created = await this.itemEstoqueRepo.create(req.body);
      log.info(`criou o item ${created.nome} no estoque`, req.user._id, created._id);

      res.json(created);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fields, populate } = req.query;

      if (typeof id === 'string') {
        const result = await this.itemEstoqueRepo.get(id, { fields, populate });

        if (result) {
          return res.json(result);
        }
      }

      throw new NotFoundError('Item não encontrado');
    } catch (err) {
      handleError(err, res);
    }
  }

  public async query(req: Request, res: Response) {
    try {
      const { fields, populate, ...search } = req.query;

      const result = await this.itemEstoqueRepo.getAll(search, { fields, populate });
      res.json(result);
    } catch (err) {
      handleError(err, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updateResult = await this.itemEstoqueRepo.update(id, data);

      if (updateResult) {
        log.info(
          `modificou ${updateResult.modifiedPaths} no item de estoque ${updateResult.result.nome}`,
          req.user._id,
          updateResult.result._id,
        );

        return res.json(updateResult.result);
      }

      throw new Error('Erro ao atualizar informações do item');
    } catch (err) {
      handleError(err, res);
    }
  }
}
