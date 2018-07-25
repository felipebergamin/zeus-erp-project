import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { ItemEstoqueInstance } from "../../../models/ItemEstoqueModel";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const itemEstoqueResolvers = {
  ItemEstoque: {
    quantidade: async (parent: ItemEstoqueInstance, args, context: ResolverContext, info) => {
      const qtdeLancamentos = await context.db.LancamentoEstoque.sum('quantidade',
        {
          where: { item: parent.get('_id') }
        }
      );

      const qtdeBaixas = await context.db.BaixaEstoque.sum('quantidade',
        {
          where: { item: parent.get('_id') }
        }
      );

      return parent.get('quantidadeInicial') + qtdeLancamentos - qtdeBaixas;
    }
  },

  Query: {
    listarItensEstoque: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.ItemEstoque.findAll({
        limit: first,
        offset
      });
    }),
  },

  Mutation: {
    addItemEstoque: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.ItemEstoque.create(input, { transaction });
      });
    }),

    updateItemEstoque: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.ItemEstoque.findById(id)
          .then((itemInstance) => {
            throwError(!itemInstance, `Item no estoque com ID ${id} não encontrado`);

            itemInstance.set(input);
            return itemInstance.save({ transaction });
          });
      });
    }),
  },
};
