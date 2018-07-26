import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const ipPoolResolvers = {

  Query: {
    getPoolByID: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      const idPool = parseInt(id, 10);
      throwError(isNaN(idPool), `ID ${id} inválido para o Pool`);

      return context.db.PoolIP.findById(idPool);
    }),

    listarIPPools: compose(...authResolvers)((parent, { first = 10, offset = 0, nopaginate = false }, context: ResolverContext, info) => {
      return nopaginate ?
      context.db.PoolIP.findAll() :
      context.db.PoolIP.findAll({
        limit: first,
        offset
      });
    }),

    totalIPPools: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.PoolIP.count();
    }),
  },

  Mutation: {
    createIPPool: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.PoolIP.create(input, { transaction });
      });
    }),

    updateIPPool: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      const idPool = parseInt(id, 10);
      throwError(isNaN(idPool), `ID ${id} inválido`);

      return context.db.sequelize.transaction((transaction) => {
        return context.db.PoolIP.findById(idPool)
          .then((pool) => {
            throwError(!pool, `Pool com ID ${idPool} não encontrado`);

            return pool.update(input, { transaction });
          });
      });
    }),
  },
};
