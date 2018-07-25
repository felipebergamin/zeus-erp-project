import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { CarneInstance } from "../../../models/CarneModel";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const carneResolvers = {
  Carne: {
    boletos: (parent: CarneInstance, args, context: ResolverContext, info) => {
      return context.db.Boleto.findAll({
        where: { carne: parent.get('_id') }
      });
    },

    cliente: (parent: CarneInstance, args, context: ResolverContext, info) => {
      return context.db.Cliente.findById(parent.get('cliente'));
    },
  },

  Query: {
    carnesPorCliente: compose(...authResolvers)((parent, { cliente }, context: ResolverContext, info) => {
      const clienteID = parseInt(cliente, 10);
      throwError(isNaN(clienteID), `ID ${cliente} inválido para o Cliente`);

      return context.db.Carne.findAll({
        where: { cliente: clienteID }
      });
    }),

    listarCarnes: compose(...authResolvers)((parent, { cliente }, context: ResolverContext, info) => {
      return context.db.Carne.findAll();
    }),
  },

  Mutation: {
    addCarne: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.Carne.create(input, { transaction });
      });
    }),

    addBoletoAoCarne: compose(...authResolvers)((parent, { boleto, carne }, context, info) => {
      const idBoleto = parseInt(boleto, 10);
      const idCarne = parseInt(carne, 10);

      throwError(isNaN(idBoleto), `ID ${idBoleto} inválido para carnê`);
      throwError(isNaN(idCarne), `ID ${idCarne} inválido para carnê`);

      return context.db.Carne.findById(idCarne)
        .then((carneInstance) => {
          throwError(!carneInstance, `Carne com ID ${idCarne} não encontrado`);

          return context.db.Boleto.findById(idBoleto)
            .then((boletoInstance) => {
              throwError(!boletoInstance, `Boleto com ID ${idBoleto} não encontrado`);

              boletoInstance.set('carne', carneInstance.get('_id'));
              return boletoInstance.save().then((saved) => !!saved);
            });
        });
    }),

    removeBoletoDoCarne: compose(...authResolvers)((parent, { boleto, carne }, context, info) => {
      const idBoleto = parseInt(boleto, 10);
      const idCarne = parseInt(carne, 10);

      throwError(isNaN(idBoleto), `ID ${idBoleto} inválido para carnê`);
      throwError(isNaN(idCarne), `ID ${idCarne} inválido para carnê`);

      return context.db.Carne.findById(idCarne)
        .then((carneInstance) => {
          throwError(!carneInstance, `Carne com ID ${idCarne} não encontrado`);

          return context.db.Boleto.findById(idBoleto)
            .then((boletoInstance) => {
              throwError(!boletoInstance, `Boleto com ID ${idBoleto} não encontrado`);

              boletoInstance.set('carne', null);
              return boletoInstance.save().then((saved) => !!saved);
            });
        });
    }),

  },
};
