import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { gerarDigitoAutoConferencia } from '../util/gerarDigitoConferenciaNN';
import db from './index';

export interface BoletoAttributes {
  _id?: number;
  baixado?: boolean;
  carne?: number;
  cliente?: number;
  contaBancaria?: number;
  dataBaixa?: Date;
  dataCredito?: Date;
  dataPagamento?: Date;
  dataVencimento?: Date;
  digitoNossoNumero?: string;
  registrado?: boolean;
  enviarAtualizacaoValor?: boolean;
  enviarAtualizacaoVencimento?: boolean;
  enviarPedidoBaixa?: boolean;
  nossoNumero?: number;
  numeroBoleto?: number;
  ocorrencias?: number;
  pago?: boolean;
  valorCobranca?: number;
  valorPago?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface BoletoInstance extends Sequelize.Instance<BoletoAttributes> {

}

export interface BoletoModel extends BaseModelInterface, Sequelize.Model<BoletoInstance, BoletoAttributes> {

}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): BoletoModel => {
  const boleto: BoletoModel = sequelize.define('Boleto', {

    _id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER.UNSIGNED,
    },

    dataBaixa: {
      type: dataTypes.DATEONLY
    },
    dataCredito: {
      type: dataTypes.DATEONLY,
    },
    dataPagamento: {
      type: dataTypes.DATEONLY
    },
    dataVencimento: {
      allowNull: false,
      type: dataTypes.DATEONLY,
    },
    valorCobranca: {
      allowNull: false,
      type: dataTypes.FLOAT,
    },
    valorPago: {
      type: dataTypes.FLOAT,
    },

    digitoNossoNumero: {
      type: dataTypes.INTEGER,
    },
    nossoNumero: {
      type: dataTypes.BIGINT.UNSIGNED,
    },

    /* informações de status do boleto */
    baixado: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    pago: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    registrado: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },

    enviarAtualizacaoValor: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    enviarAtualizacaoVencimento: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
    enviarPedidoBaixa: {
      defaultValue: false,
      type: dataTypes.BOOLEAN,
    },
  },
    {
      paranoid: true,
      tableName: 'boletos',
    });

  boleto.afterCreate((boleto, opt: any) => {
    return db.ContaBancaria.findById(boleto.get('contaBancaria'))
      .then(conta => {
        const nossoNumero = parseInt(boleto.get('_id')) + parseInt(conta.get('nossoNumero'));
        const digito = gerarDigitoAutoConferencia(conta.get('carteira'), nossoNumero);

        boleto.set('nossoNumero', nossoNumero);
        boleto.set('digitoNossoNumero', digito);

        return boleto.save({ transaction: opt.transaction });
      });
  });

  return boleto;
};
