import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { OLTInstance } from "../../../models/OLTModel";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const oltResolvers = {

  Query: {
    listarOLTs: compose(...authResolvers)((parent, { first = 10, offset = 0, nopaginate = false }, context: ResolverContext, info) => {
      return nopaginate ?
      context.db.OLT.findAll() :
      context.db.OLT.findAll({
        limit: first,
        offset,
      });
    }),

    getOLTByID: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      const idOLT = parseInt(id, 10);
      throwError(isNaN(idOLT), `ID ${id} inválido para OLT`);

      return context.db.OLT.findById(id);
    }),

    totalOlts: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      return context.db.OLT.count();
    }),
  },

  Mutation: {
    createOLT: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.OLT.create(args.input, { transaction });
      });
    }),

    updateOLT: compose(...authResolvers)((parent, { oltID, input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.OLT.findById(oltID)
          .then((olt: OLTInstance) => {
            throwError(!olt, `OLT com id ${oltID} não encontrada`);

            return olt.update(input, { transaction });
          });
      });
    }),
  },
};
