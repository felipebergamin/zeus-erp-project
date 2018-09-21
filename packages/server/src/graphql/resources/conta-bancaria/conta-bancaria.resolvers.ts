import { Transaction } from "sequelize";

import * as debug from '../../../debug';
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const contaBancariaResolvers = {

  Query: {
    listBankAccounts: compose(...authResolvers)((parent, { first = 10, offset = 0, nopaginate = false }, context: ResolverContext, info) => {
      return nopaginate ?
        context.db.ContaBancaria.findAll() :
        context.db.ContaBancaria.findAll({
          limit: first,
          offset,
        });
    }),

    totalBankAccounts: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.ContaBancaria.count();
    }),

    getBankAccountByID: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      return context.db.ContaBancaria.findById(id);
    }),
  },

  Mutation: {
    createBankAccount: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction: Transaction) => {
        return context.db.ContaBancaria.create(args.input, { transaction });
      });
    }),

    updateBankAccount: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        const idConta = parseInt(id, 10);
        throwError(isNaN(idConta), `ID ${id} inválido para conta bancária`);

        return context.db.ContaBancaria.findById(idConta)
          .then((conta) => {
            throwError(!conta, `Conta com ID ${id} não encontrada!`);
            throwError(+conta.get('version') !== +input.version,
              'Ops... Alguém atualizou o registro no banco antes de você. ' +
              'Para garantir a integridade dos dados, o sistema não vai salvar suas alterações!');

            return conta.set(input).save({ transaction });
          });
      });
    }),

    deleteBankAccount: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      const idConta = parseInt(id, 10);
      throwError(isNaN(idConta), `ID ${id} inválido para conta bancária`);

      return context.db.sequelize.transaction((transaction) => {
        return context.db.ContaBancaria.findById(idConta)
          .then((conta) => {
            throwError(!conta, `Conta bancária com ID ${id} não encontrada`);
            return conta.destroy({ transaction })
              .then((destroyed) => !!destroyed);
          });
      });
    }),
  },
};
