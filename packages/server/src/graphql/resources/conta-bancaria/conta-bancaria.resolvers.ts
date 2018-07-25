import { Transaction } from "sequelize";

import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const contaBancariaResolvers = {

  Query: {
    listBankAccounts: compose(...authResolvers)((parent, { first = 10, offset = 0, excluded = false, nopaginate = false }, context: ResolverContext, info) => {
      return nopaginate ?
        context.db.ContaBancaria.findAll({
          paranoid: !excluded
        }) :
        context.db.ContaBancaria.findAll({
          limit: first,
          offset,
          paranoid: !excluded,
        });
    }),

    totalBankAccounts: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.ContaBancaria.count();
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
            throwError(!conta, `Conta bancária com ID ${idConta} não encontrada`);
            return conta.update(input);
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

    restoreBankAccount: compose(...authResolvers)((parent, { id }, context, info) => {
      const idConta = parseInt(id, 10);
      throwError(isNaN(idConta), `ID ${id} inválido para conta bancária`);

      return context.db.sequelize.transaction((transaction) => {
        return context.db.ContaBancaria.findById(idConta, { paranoid: false })
          .then((conta) => {
            throwError(!conta, `Conta bancária com ID ${id} não encontrada`);

            return conta.restore({ transaction })
              .then((restored) => !!restored);
          });
      });
    }),
  },
};
