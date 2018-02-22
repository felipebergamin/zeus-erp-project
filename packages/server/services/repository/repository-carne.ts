// tslint:disable:max-line-length
import moment = require("moment");
import { Document } from "mongoose";

import { instanceDB } from "../../db/initConnection";
import { NotFoundError } from "../../errors/NotFoundError";
import { IBoletoBancario } from "../../interfaces/IBoletoBancario";
import { ICarne } from "../../interfaces/ICarne";
import { IRepository } from "../../interfaces/IRepository";
import { RepositoryBoleto } from "./repository-boleto";
import { RepositoryCliente } from "./repository-cliente";
import * as utils from "./utils";

export class RepositoryCarne implements IRepository<ICarne> {

  constructor(
    private repoBoleto: RepositoryBoleto,
    private repoCliente: RepositoryCliente) { }

  public async create(data: ICarne): Promise<ICarne> {
    const Carne = (await instanceDB()).model("Carne");
    let cliente;

    if (typeof data.cliente === "string") {
      cliente = await this.repoCliente.get(data.cliente);
    } else {
      cliente = data.cliente;
    }

    if (!cliente) {
      throw new NotFoundError("Cliente não encontrado");
    }

    const carneCriado = await new Carne(data).save();

    if ('parcelas' in data && 'valor' in data && 'primeiroVencimento' in data) {
      const qtdParcelas = +data.parcelas;
      const vencimentoInicial = moment(data.primeiroVencimento);

      if (!vencimentoInicial.isValid()) {
        throw new Error('A data de vencimento é inválida');
      }

      if (isNaN(qtdParcelas)) {
        throw new Error('Quantidade de parcelas deve ser um número');
      }

      const boletosDoCarne: any[] = [];

      for (let i = 0; i < qtdParcelas; i++) {
        const dataVencimento = vencimentoInicial.clone().add(i, 'months');

        if (dataVencimento.isoWeekday() === 7) { // se o dia de vencimento for um domingo
          dataVencimento.add(1, 'days'); // muda o vencimento para a próxima segunda
        }

        const boleto = await this.repoBoleto.create({
          carne: carneCriado.id,
          cliente: cliente._id,
          contaBancaria: cliente.contaBancaria,
          dataVencimento: dataVencimento.toDate(),
          valorCobranca: data.valor,
        } as IBoletoBancario);

        boletosDoCarne.push(boleto);
      }

      return carneCriado.toObject() as ICarne;
    }
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<ICarne> {
    const Carne = (await instanceDB()).model("Carne");
    const query = Carne.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    const result = await query.exec();
    return result.toObject() as ICarne;
  }

  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<ICarne[]> {
    const Carne = (await instanceDB()).model("Carne");
    const query = Carne.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(fields));
    }

    return (await query.exec())
      .map((carne: Document) => carne.toObject()) as ICarne[];
  }

  public async remove(id: string): Promise<ICarne> {
    const carne = await this.get(id);

    if (!carne) {
      throw new NotFoundError("Carnê não encontrado");
    }

    const boletos = await this.repoBoleto.getAll({ carne: carne._id });

    for (const boleto of boletos) {
      boleto.excluido = true;
      boleto.excluidoEm = new Date();
      await this.repoBoleto.update(boleto._id, boleto);
    }

    carne.excluido = true;
    carne.excluidoEm = new Date();

    return (await this.update(carne._id, carne)).result;
  }

  public async update(id: string, data: ICarne): Promise<{ result: ICarne, modifiedPaths: string }> {
    const Carne = (await instanceDB()).model("Carne");
    const carne = await Carne.findById(id);

    if (!carne) {
      throw new NotFoundError("Carnê não encontrado");
    }

    carne.set(data);
    const modifiedPaths = carne.modifiedPaths().join(", ");
    await carne.save();

    return {
      modifiedPaths,
      result: carne.toObject() as ICarne,
    };
  }

}
