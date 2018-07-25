import { GraphQLResolveInfo } from "graphql";

import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { OcorrenciaBancariaInstance } from "../../../models/OcorrenciaBancariaModel";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const ocorrenciaBancariaResolvers = {

  OcorrenciaBancaria: {
    boleto: (parent: OcorrenciaBancariaInstance, args, context: ResolverContext, info: GraphQLResolveInfo) => {
      return context.db.Boleto.findById(parent.get('boleto'));
    },
  },

  Query: {
    ocorrenciasDoBoleto: compose(...authResolvers)((parent, { boleto }, context: ResolverContext, info: GraphQLResolveInfo) => {
      const idBoleto = parseInt(boleto, 10);

      throwError(isNaN(idBoleto), `ID ${boleto} inválido para o boleto`);

      return context.db.OcorrenciaBancaria.findAll({
        where: { boleto: idBoleto }
      });
    }),
  },

};
