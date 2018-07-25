import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { ArquivoRetornoInstance } from "../../../models/ArquivoRetornoModel";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const arquivoRetornoResolvers = {

  ArquivoRetorno: {
    contaBancaria: (parent: ArquivoRetornoInstance, args, context: ResolverContext, info) => {
      return context.db.ContaBancaria.findById(parent.get('contaBancaria'));
    },
  },

  Query: {
    listarArquivosRetorno: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.ArquivoRetorno.findAll({
        limit: first,
        offset,
      });
    }),

    totalArquivosRetorno: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.ArquivoRetorno.count();
    }),
  },

  Mutation: {

  }
};
