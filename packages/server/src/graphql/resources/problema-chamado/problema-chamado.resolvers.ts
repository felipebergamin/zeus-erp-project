import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const problemaChamadoResolvers = {

  Query: {
    listarProblemasChamado: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.ProblemaChamado.findAll({
        limit: first,
        offset
      });
    }),
  },

  Mutation: {
    addProblemaChamado: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.ProblemaChamado.create(input, { transaction });
      });
    }),

    updateProblemaChamado: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      id = parseInt(id, 10);
      throwError(isNaN(id), `ID inválido`);

      return context.db.sequelize.transaction((transaction) => {
        return context.db.ProblemaChamado.findById(id)
          .then((problemaChamado) => {
            throwError(!problemaChamado, `Problema com ID ${id} não encontrado`);

            problemaChamado.set(input);
            return problemaChamado.save({ transaction });
          });
      });
    }),
  },
};
