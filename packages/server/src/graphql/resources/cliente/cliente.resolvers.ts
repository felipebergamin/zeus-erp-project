import { col, fn, Op, Transaction, where } from "sequelize";

import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { ClienteInstance } from "../../../models/ClienteModel";
import { applyLikeOp } from "../../../util/sequelize";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const clienteResolvers = {
  Cliente: {
    contaBancaria: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.ContaBancaria.findById(parent.get('contaBancaria'));
    }),

    pontosDeAcesso: compose(...authResolvers)((parent: ClienteInstance, args, context: ResolverContext, info) => {
      return context.db.PontoAcesso.findAll({
        where: { cliente: parent.get('_id') }
      });
    }),
  },

  Query: {
    getCustomerByID: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      return context.db.Cliente.findById(id);
    }),

    listCustomers: compose(...authResolvers)((parent, { first = 10, offset = 0, excluded = false }, context: ResolverContext, info) => {
      return context.db.Cliente.findAll({
        limit: first,
        offset,
        order: [
          [ 'nome' ],
          [ '_id' ],
        ],
        paranoid: !excluded,
      });
    }),

    totalCustomers: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.Cliente.count();
    }),

    cpfCnpjAlreadyExists: compose(...authResolvers)((parent, { cpfCnpj }, context: ResolverContext, info) => {
      return context.db.Cliente.count({ where: { cpfCnpj } })
        .then((count) => count > 0);
    }),

    searchCustomer: compose(...authResolvers)((parent, { values }, context: ResolverContext, info) => {
      let whereCreatedAt = {};

      const likeOptoField = applyLikeOp(values);
      likeOptoField('nome');
      likeOptoField('logradouro');

      if ('createdAt' in values) {
        whereCreatedAt = where(fn('DATE', col('createdAt')), fn('DATE', values.createdAt));
        delete values.createdAt;
      }

      return context.db.Cliente.findAll({
        where: {
          [Op.and]: [
            whereCreatedAt,
            values
          ]
        }
      });
    }),

    valorTotalMensalidadeCliente: compose(...authResolvers)(async (parent, { clienteID }, context: ResolverContext, info) => {
      let valorTotal = 0;
      const pas = await context.db.PontoAcesso.findAll({
        attributes: ['_id', 'plano', 'cliente'],
        where: { cliente: clienteID, incluirNaCobranca: true },

        include: [
          {
            attributes: ['_id', 'valorMensal'],
            model: context.db.Plano,
            required: true,
          }
        ]
      });

      pas.forEach((pa: any) => {
        valorTotal += pa.Plano.valorMensal;
      });
      return valorTotal;
    }),
  },

  Mutation: {
    createCustomer: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction: Transaction) => {
        return context.db.Cliente.create(args.input, { transaction });
      });
    }),

    deleteCustomer: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction: Transaction) => {
        return context.db.Cliente.findById(id)
          .then((cliente) => {
            return cliente.destroy({ transaction })
              .then((destroyed) => !!destroyed);
          });
      });
    }),

    updateCustomer: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction: Transaction) => {
        return context.db.Cliente.findById(id)
          .then((cliente) => {
            return cliente.update(input, { transaction });
          });
      });
    }),
  },
};
