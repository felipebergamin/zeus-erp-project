import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { LancamentoEstoqueInstance } from "../../../models/LancamentoEstoqueModel";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const lancamentoEstoqueResolvers = {

  LancamentoEstoque: {
    criadoPor: (parent: LancamentoEstoqueInstance, args, context: ResolverContext, info) => {
      return context.db.Usuario.findById(parent.get('criadoPor'));
    },

    item: (parent: LancamentoEstoqueInstance, args, context: ResolverContext, info) => {
      return context.db.ItemEstoque.findById(parent.get('item'));
    },

  },

  Query: {
    listarLancamentosEstoque: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.LancamentoEstoque.findAll({
        limit: first,
        offset,
      });
    }),

    listarLancamentosEstoquePorItem: compose(...authResolvers)((parent, { idItem, first, offset }, context: ResolverContext, info) => {
      return context.db.LancamentoEstoque.findAll({
        limit: first,
        offset,
        where: { item: idItem },
      });
    }),

  },

  Mutation: {
    addLancamentoEstoque: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {
      input['criadoPor'] = context.authUser._id;

      return context.db.sequelize.transaction((transaction) => {
        return context.db.LancamentoEstoque.create(input, { transaction });
      });
    }),

    updateLancamentoEstoque: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.LancamentoEstoque.findById(id)
          .then((lancamento) => {
            throwError(!lancamento, `Lançamento com ID ${id} não encontrado`);

            lancamento.set(input);
            return lancamento.save({ transaction });
          });
      });
    }),

    deleteLancamentoEstoque: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.LancamentoEstoque.findById(id)
          .then((lancamento) => {
            throwError(!lancamento, `Lançamento com ID ${id} não encontrado`);

            return lancamento.destroy()
              .then((destroyed) => !!destroyed);
          });
      });
    }),

  },
};
