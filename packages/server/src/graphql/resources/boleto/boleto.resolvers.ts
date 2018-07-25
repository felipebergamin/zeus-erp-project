import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { BoletoInstance } from "../../../models/BoletoModel";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const boletoResolvers = {

  Boleto: {
    carne: (parent: BoletoInstance, args, context: ResolverContext, info) => {
      return context.db.Carne.findById(parent.get('carne'));
    },

    cliente: (parent: BoletoInstance, args, context: ResolverContext, info) => {
      return context.db.Cliente.findById(parent.get('cliente'));
    },

    contaBancaria: (parent: BoletoInstance, args, context: ResolverContext, info) => {
      return context.db.ContaBancaria.findById(parent.get('contaBancaria'));
    },

    ocorrencias: (parent: BoletoInstance, args, context: ResolverContext, info) => {
      return context.db.OcorrenciaBancaria.findAll({
        where: { boleto: parent.get('_id') }
      });
    },
  },

  Query: {
    listarBoletos: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.Boleto.findAll();
    }),

    listarBoletosPorCliente: compose(...authResolvers)((parent, { clienteID }, context: ResolverContext, info) => {
      const id = parseInt(clienteID, 10);

      throwError(isNaN(id), `ID ${clienteID} inválido para boleto`);

      return context.db.Boleto.findAll({
        where: { cliente: id }
      });
    }),

    getBoletoComID: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      const idBoleto = parseInt(id, 10);
      throwError(isNaN(idBoleto), `ID ${id} é inválido para o boleto`);

      return context.db.Boleto.findById(idBoleto);
    }),
  },

  Mutation: {
    addBoleto: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.Boleto.create(input, { transaction });
      });
    }),

    updateBoleto: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      const idBoleto = parseInt(id, 10);
      throwError(isNaN(idBoleto), `ID ${id} é inválido para o boleto`);

      return context.db.sequelize.transaction((transaction) => {
        return context.db.Boleto.findById(idBoleto)
          .then((boleto) => {
            throwError(!boleto, `Boleto com ID ${idBoleto} não encontrado`);
            boleto.set(input);

            if (boleto.get('registrado')) {
              if (boleto.changed('valorCobranca'))
                boleto.set('enviarAtualizacaoValor', true);

              if (boleto.changed('dataVencimento'))
                boleto.set('enviarAtualizacaoVencimento', true);
            }

            return boleto.save();
          });
      });
    }),
  },
};
