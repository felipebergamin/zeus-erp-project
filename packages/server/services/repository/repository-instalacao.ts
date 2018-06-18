import { Document } from "mongoose";

import { instanceDB } from "../../db/initConnection";
import { NotFoundError } from "../../errors/NotFoundError";
import { IInstalacao } from "../../interfaces/IInstalacao";
import { IRepository } from "../../interfaces/IRepository";
import * as utils from "./utils";

export class RepositoryInstalacao implements IRepository<IInstalacao> {

  public async create(data: IInstalacao): Promise<IInstalacao> {
    const Instalacao = (await instanceDB()).model("Instalacao");

    const {
      cliente,
      dataAgenda,
      dataPagamento,
      observacoesAtendente,
      tecnicoResponsavel,
      cobrado,
      modoPagamento,
      observacoesPagamento,
      pago,
      recebidoPor,
      valor,
      pontoAcesso
    } = data;

    const instalacao = new Instalacao({
      cliente,
      cobrado,
      dataAgenda,
      dataPagamento,
      modoPagamento,
      observacoesAtendente,
      observacoesPagamento,
      pago,
      recebidoPor,
      tecnicoResponsavel,
      valor,
      pontoAcesso
    });

    return (await instalacao.save()).toObject() as IInstalacao;
  }

  public async get(id: string, options: { fields?: string, populate?: string } = {}): Promise<IInstalacao> {
    const Instalacao = (await instanceDB()).model("Instalacao");
    const query = Instalacao.findById(id);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    const instalacao = await query.exec();

    if (!instalacao) {
      throw new NotFoundError(`Instalação ${id} não encontrada`);
    }

    return instalacao.toObject() as IInstalacao;
  }

  // tslint:disable-next-line:max-line-length
  public async getAll(searchValues: any, options: { fields?: string, populate?: string } = {}): Promise<IInstalacao[]> {
    const Instalacao = (await instanceDB()).model("Instalacao");
    const query = Instalacao.find(searchValues);
    const { fields, populate } = options;

    if (fields) {
      query.select(utils.normalizeFields(fields));
    }
    if (populate) {
      query.populate(utils.normalizePopulate(populate));
    }

    return (await query.exec())
      .map((instalacao: Document) => instalacao.toObject()) as IInstalacao[];
  }

  public async remove(id: string): Promise<IInstalacao> {
    throw new Error("Não é permitido excluir uma instalacao do sistema");
  }

  public async update(id: string, data: IInstalacao): Promise<{ result: IInstalacao, modifiedPaths: string }> {
    const Instalacao = (await instanceDB()).model("Instalacao");
    const instalacao = await Instalacao.findById(id).exec();
    const { tecnicoResponsavel, dataAgenda } = data;

    if (!instalacao) {
      throw new NotFoundError(`Instalação ${id} não encontrada!`);
    }

    // remove propriedades que não podem ser alteradas livremente
    const {
      cancelada,
      dataHoraCancelada,
      motivoCancelamento,
      concluida,
      dataHoraConclusao,
      cliente,
      protocolo,
      ...updateData
    } = data;

    instalacao.set(updateData);

    if (!instalacao.isModified()) {
      return null;
    }

    const modifiedPaths = instalacao.modifiedPaths().join(", ");
    await instalacao.save();

    return {
      modifiedPaths,
      result: instalacao.toObject() as IInstalacao,
    };
  }

  public async cancel(id: string, motivoCancelamento: string): Promise<IInstalacao> {
    const instalacao = await this.get(id);

    if (!instalacao) {
      throw new NotFoundError(`Instalação ${id} não encontrada`);
    }

    if (instalacao.cancelada || instalacao.concluida) {
      throw new Error("Impossível cancelar uma instalação já concluída ou cancelada!");
    }

    instalacao.cancelada = true;
    instalacao.dataHoraCancelada = new Date();
    instalacao.motivoCancelamento = motivoCancelamento;
    const { result } = await this.update(id, instalacao);

    return result;
  }

  public async complete(id: string): Promise<IInstalacao> {
    const instalacao = await this.get(id);

    if (!instalacao) {
      throw new NotFoundError(`Instalação não encontrada!`);
    }
    if (instalacao.cancelada || instalacao.concluida) {
      throw new Error("Impossível concluir uma instalação já concluída ou cancelada");
    }

    instalacao.concluida = true;
    instalacao.dataHoraConclusao = new Date();

    const { result } = await this.update(id, instalacao);
    return result;
  }

}
