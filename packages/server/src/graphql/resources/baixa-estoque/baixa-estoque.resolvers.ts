import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { BaixaEstoqueInstance } from "../../../models/BaixaEstoqueModel";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const baixaEstoqueResolvers = {
  BaixaEstoque: {
    criadoPor: (parent: BaixaEstoqueInstance, args, context: ResolverContext, info) => {
      return context.db.Usuario.findById(parent.get('criadoPor'));
    },

    item: (parent: BaixaEstoqueInstance, args, context: ResolverContext, info) => {
      return context.db.ItemEstoque.findById(parent.get('item'));
    },
  },

  Query: {
    listarBaixasEstoque: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.BaixaEstoque.findAll({
        limit: first,
        offset
      });
    }),

    listarBaixasEstoquePorItem: compose(...authResolvers)((parent, { idItem, first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.BaixaEstoque.findAll({
        limit: first,
        offset,
        where: { item: idItem },
      });
    }),

  },

  Mutation: {
    addBaixaEstoque: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.BaixaEstoque.create(input, { transaction });
      });
    }),

    updateBaixaEstoque: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.BaixaEstoque.findById(id)
          .then((baixaEstoque) => {
            throwError(!baixaEstoque, `Baixa no estoque com ID ${id} não encontrada`);

            baixaEstoque.set(input);
            return baixaEstoque.save({ transaction });
          });
      });
    }),

    deleteBaixaEstoque: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.BaixaEstoque.findById(id)
          .then((baixaEstoque) => {
            throwError(!baixaEstoque, `Baixa no estoque com ID ${id} não encontrada`);

            return baixaEstoque.destroy({ transaction })
              .then((destroyed) => !!destroyed);
          });
      });
    }),

  },
};
