import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { ArquivoRemessaInstance } from "../../../models/ArquivoRemessaModel";
import { Remessa } from "../../../services/CNABService";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const arquivoRemessaResolvers = {
  ArquivoRemessa: {
    contaBancaria: (parent: ArquivoRemessaInstance, args, context: ResolverContext, info) => {
      return context.db.ContaBancaria.findById(parent.get('contaBancaria'));
    },
  },

  Query: {
    listarArquivosRemessa: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.ArquivoRemessa.findAll({
        limit: first,
        offset,
      });
    }),

    totalArquivosRemessa: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.ArquivoRemessa.count();
    }),
  },

  Mutation: {
    gerarArquivoRemessa: compose(...authResolvers)(async (parent, args, context: ResolverContext, info) => {
      const contaBancaria = await context.db.ContaBancaria.findById(args.contaBancaria);
      return new Remessa().generate(contaBancaria, args);
    }),

    deleteArquivoRemessa: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.ArquivoRemessa.findById(id)
          .then((arquivo) => {
            throwError(!arquivo, `Arquivo com ID ${id} não encontrado`);

            arquivo.destroy({ transaction })
              .then((destroyed) => !!destroyed);
          });
      });
    }),
  }
};
