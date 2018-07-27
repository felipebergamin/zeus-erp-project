import { Op, Transaction } from "sequelize";

import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { ClienteInstance } from "../../../models/ClienteModel";
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
      if (values.nome) {
        values.nome = {
          [Op.like]: `%${values.nome}%`
        };
      }

      return context.db.Cliente.findAll({ where: values });
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