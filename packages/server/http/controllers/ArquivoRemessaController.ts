import { Request, Response } from 'express';
import fs = require('fs');
import moment = require('moment');

import debug = require("../../debug");
import { NotFoundError } from '../../errors/NotFoundError';
import { Remessa } from "../../services/CNABService";
import { LogService as log } from "../../services/LogService";
import { RepositoryArquivoRemessa } from '../../services/repository/repository-arquivo-remessa';
import { RepositoryContaBancaria } from '../../services/repository/repository-conta-bancaria';
import * as utils from "../utils/HttpControllers";

export class ArquivoRemessaController {

  constructor(
    private remessaService: Remessa,
    private contaBancariaRepository: RepositoryContaBancaria,
    private remessaRepository: RepositoryArquivoRemessa,
  ) { }

  public async create(req: Request, res: Response) {
    try {
      const { contaBancaria, ...generateOptions } = req.body;

      const cb = await this.contaBancariaRepository.get(contaBancaria);

      if (!cb) {
        throw new NotFoundError(`Conta bancária ${contaBancaria} não encontrada!`);
      }

      const remessa = await this.remessaService.generate(cb, generateOptions);

      if (remessa === null) {
        throw new NotFoundError("Não há boletos para gerar remessa");
      }

      log.info(`gerou a remessa ${remessa.nome}`, req.user._id, remessa._id);
      res.json(remessa);
    } catch (err) {
      utils.handleError(err, res);
      console.error(err.stack);
    }
  }

  public async get(req: Request, res: Response) {
    const { fields, populate } = req.query;
    const remessa = await this.remessaRepository.get(req.params.id, { fields, populate });

    res.json(remessa);
  }

  public async getAll(req: Request, res: Response) {
    const { fields, populate, ...search } = req.query;
    const list = await this.remessaRepository.getAll(search, { fields, populate });

    res.json(list);
  }

  public async download(req: Request, res: Response) {
    const remessa = await this.remessaRepository.get(req.params.id);

    if (!remessa) {
      throw new NotFoundError(`Remessa ${req.params.id} não encontrada`);
    }

    const path = `/tmp/${remessa.nome}`;
    fs.writeFileSync(path, remessa.conteudoArquivo, 'utf8');
    res.download(path, remessa.nome, () => {
      debug("Download concluído");
      // fs.unlinkSync(path);
    });
  }
}
