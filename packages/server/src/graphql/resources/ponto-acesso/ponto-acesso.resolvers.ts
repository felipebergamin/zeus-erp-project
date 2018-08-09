import { Op } from 'sequelize';

import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { PontoAcessoInstance } from "../../../models/PontoAcessoModel";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const pontoAcessoResolvers = {

  PontoAcesso: {
    cliente: (parent: PontoAcessoInstance, args, context: ResolverContext, info) => {
      return context.db.Cliente.findById(parent.get('cliente'));
    },
    olt: (parent: PontoAcessoInstance, args, context: ResolverContext, info) => {
      return context.db.OLT.findById(parent.get('olt'));
    },
    plano: (parent: PontoAcessoInstance, args, context: ResolverContext, info) => {
      return context.db.Plano.findById(parent.get('plano'));
    },
    pool: (parent: PontoAcessoInstance, args, context: ResolverContext, info) => {
      return context.db.PoolIP.findById(parent.get('_id'));
    },
  },

  Query: {
    listarPontosDeAcesso: compose(...authResolvers)((parent, { first = 10, offset = 0, nopaginate = false }, context: ResolverContext, info) => {
      return nopaginate ?
      context.db.PontoAcesso.findAll({
        order: [
          [ 'login' ],
          [ '_id' ],
        ]
      }) :
      context.db.PontoAcesso.findAll({
        limit: first,
        offset,
        order: [
          [ 'login' ],
          [ '_id' ],
        ]
      });
    }),

    totalPontosDeAcesso: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.PontoAcesso.count();
    }),

    pontoDeAcessoPorCliente: compose(...authResolvers)((parent, { idCliente }, context: ResolverContext, info) => {
      idCliente = parseInt(idCliente, 10);
      throwError(isNaN(idCliente), `ID ${idCliente} inválido`);

      return context.db.PontoAcesso.findAll({
        where: { cliente: idCliente }
      });
    }),

    pontoDeAcessoPorID: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      const idPonto = parseInt(id, 10);
      throwError(isNaN(idPonto), `ID ${id} inválido para Ponto de Acesso`);

      return context.db.PontoAcesso.findById(idPonto);
    }),

    loginAlreadyExists: compose(...authResolvers)((parent, { login }, context: ResolverContext, info) => {
      return context.db.PontoAcesso.count({ where: { login } })
        .then((count) => count > 0);
    }),

    buscarPontosAcesso: compose(...authResolvers)((parent, {searchVals}, context: ResolverContext, info) => {
      if (searchVals.login) {
        searchVals.login = {
          [Op.like]: `%${searchVals.login}%`
        };
      }
      return context.db.PontoAcesso.findAll({ where: searchVals });
    }),
  },

  Mutation: {
    addPontoDeAcesso: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.PontoAcesso.create(input);
      });
    }),

    updatePontoDeAcesso: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      const idPonto = parseInt(id, 10);
      throwError(isNaN(idPonto), `ID ${id} inválido para Ponto de Acesso`);

      return context.db.PontoAcesso.findById(idPonto)
        .then((plano) => {
          throwError(!plano, `Ponto de acesso com ID ${idPonto} não encontrado`);

          return plano.update(input);
        });
    }),

    removerPontoAcesso: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      const idPonto = parseInt(id, 10);
      throwError(isNaN(idPonto), `ID ${id} inválido para Ponto de Acesso`);

      return context.db.PontoAcesso.findById(idPonto)
        .then((plano) => {
          throwError(!plano, `Ponto de acesso com ID ${idPonto} não encontrado`);

          return plano.destroy()
            .then((destroyed) => !!destroyed);
        });
    }),
  },

};
