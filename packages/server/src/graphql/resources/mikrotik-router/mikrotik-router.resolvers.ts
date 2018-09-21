import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { handleError, throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const mikrotikRouterResolvers = {

  MikrotikRouter: {
  },

  Query: {
    mikrotikRoutersList: compose(...authResolvers)((parent, { first = 10, offset = 0, nopaginate = false }, { db }: ResolverContext, info) => {
      return db.MikrotikRouter.findAll(nopaginate ? {} : { limit: first, offset });
    }),

    mikrotikRoutersCount: compose(...authResolvers)((parent, args, { db }: ResolverContext, info) => {
      return db.MikrotikRouter.count();
    }),

    mikrotikRouterById: compose(...authResolvers)((parent, { id }, { db }: ResolverContext, info) => {
      return db.MikrotikRouter.findById(id);
    }),
  },

  Mutation: {
    createMikrotikRouter: compose(...authResolvers)((parent, { input }, { db }: ResolverContext, info) => {
      return db.sequelize.transaction((transaction) => {
        return db.MikrotikRouter.create(input, { transaction });
      });
    }),

    updateMikrotikRouter: compose(...authResolvers)((parent, { id, input }, { db }: ResolverContext, info) => {
      return db.sequelize.transaction((transaction) => {
        return db.MikrotikRouter.findById(id)
          .then((router) => {
            throwError(!router, `Roteador com id ${id} não encontrado!`);

            router.set(input);
            return router.save({ transaction });
          });
      });
    }),

    deleteMikrotikRouter: compose(...authResolvers)((parent, { id }, { db }: ResolverContext, info) => {
      return db.sequelize.transaction((transaction) => {
        return db.MikrotikRouter.destroy({ where: { id }, transaction})
          .catch(handleError);
      });
    }),
  },
};
