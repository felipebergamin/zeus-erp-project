import { Request, Response } from 'express';
import fs = require('fs');

import debug = require('../../debug');
import { NotFoundError } from '../../errors/NotFoundError';
import { Retorno } from '../../services/CNABService';
import { LogService as log } from "../../services/LogService";
import { RepositoryArquivoRetorno } from '../../services/repository/repository-arquivo-retorno';
import * as httpUtils from '../utils/HttpControllers';

export class ArquivoRetornoController {

  constructor(
    private retornoService: Retorno,
    private repoRetorno: RepositoryArquivoRetorno,
  ) {}

  public async upload(req: Request, res: Response) {
    debug('ArquivoRetornoController#upload');
    try {
      if ('retorno' in req.files) {
        debug('read file content: ' + req.files.retorno.path);
        const fileContent = fs.readFileSync(req.files.retorno.path, 'utf8');
        debug('parse file content');
        const retorno = await this.retornoService.parseFileContent(fileContent, true);

        const saved = await this.repoRetorno.create({
          contaBancaria: req.body.contaBancaria,
          conteudoArquivo: fileContent,
          dataGravacao: retorno.dataGravacao,
          nomeArquivo: req.files.retorno.name,
          quantidadeOperacoes: retorno.registros.length,
        });

        delete saved.conteudoArquivo;
        res.json(saved);

        log.info(`enviou um arquivo de retorno`, req.user._id, req.user._id);
      } else {
        throw new Error("Erro: O Arquivo Retorno não foi recebido");
      }
    } catch (err) {
      httpUtils.handleError(err, res);
    }
  }

  public async get(req: Request, res: Response) {
    debug('ArquivoRetornoController#get');

    try {
      const { id } = req.params;
      const { populate, fields } = req.query;

      const retorno = await this.repoRetorno.get(id, { populate, fields });

      if (!retorno) {
        throw new NotFoundError(`Retorno não encontrado`);
      }
      return res.json(retorno);
    } catch (err) {
      httpUtils.handleError(err, res);
    }
  }

  public async getAll(req: Request, res: Response) {
    debug('ArquivoRetornoController#getAll');

    try {
      const { fields, populate, ...search } = req.query;
      const retornos = await this.repoRetorno.getAll(search, { fields, populate });

      res.json(retornos);
    } catch (err) {
      httpUtils.handleError(err, res);
    }
  }

  public async parse(req: Request, res: Response) {
    debug('ArquivoRetornoController#parse');

    try {
      const { id } = req.params;
      const retorno = await this.repoRetorno.get(id);

      if (!retorno) {
        throw new NotFoundError(`Retorno ${id} não encontrado`);
      }

      const parsed = await this.retornoService.parseFileContent(retorno.conteudoArquivo, false);
      res.json(parsed);
    } catch (err) {
      httpUtils.handleError(err, res);
    }
  }

  public async download(req: Request, res: Response) {
    debug('ArquivoRetornoController#download');

    try {
      const { id } = req.params;
      const retorno = await this.repoRetorno.get(id);

      if (!retorno) {
        throw new NotFoundError('Retorno não encontrado');
      }

      const filePath = `/tmp/${retorno.nomeArquivo}`;

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      fs.writeFileSync(filePath, retorno.conteudoArquivo, 'utf8');
      res.download(filePath, retorno.nomeArquivo, () => fs.unlinkSync(filePath));
    } catch (err) {
      httpUtils.handleError(err, res);
    }
  }
}
