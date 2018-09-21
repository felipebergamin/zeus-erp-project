import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const planoResolvers = {

  Query: {
    listarPlanos: compose(...authResolvers)((parent, { first = 10, offset = 0, nopaginate = false }, context: ResolverContext, info: GraphQLResolveInfo) => {
      return nopaginate ?
      context.db.Plano.findAll() :
      context.db.Plano.findAll({
        limit: first,
        offset
      });
    }),

    getPlanoByID: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      const idPlano = parseInt(id, 10);
      throwError(isNaN(idPlano), `ID ${id} inválido para o plano`);

      return context.db.Plano.findById(idPlano);
    }),

    totalPlanos: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.Plano.count();
    }),
  },

  Mutation: {
    createPlano: compose(...authResolvers)((parent, { input }, context: ResolverContext, info: GraphQLResolveInfo) => {
      return context.db.sequelize.transaction((transaction: Transaction) => {
        return context.db.Plano.create(input, { transaction });
      });
    }),

    updatePlano: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info: GraphQLResolveInfo) => {
      const idPlano = parseInt(id, 10);
      throwError(isNaN(id), `ID ${id} inválido para um plano`);

      return context.db.sequelize.transaction((transaction: Transaction) => {
        return context.db.Plano.findById(idPlano)
          .then((plano) => {
            throwError(!plano, `Plano com ID ${idPlano} não encontrado`);

            return plano.update(input, { transaction });
          });
      });
    }),

    deletePlano: compose(...authResolvers)((parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
      return context.db.sequelize.transaction((transaction: Transaction) => {
        return context.db.Plano.destroy({ where: { _id: id }, transaction});
      });
    }),
  },
};
