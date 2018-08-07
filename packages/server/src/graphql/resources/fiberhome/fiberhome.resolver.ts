import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { throwError } from "../../../util/utils";

import { FiberhomeService } from '../../../services/FiberhomeService';

export const fiberhomeResolvers = {

  Query: {
    consultarSinalONUPA: compose(...authResolvers)(async (parent, {pontoAcesso}, context: ResolverContext, info) => {
      try {

        const paInstance = await context.db.PontoAcesso.findById(pontoAcesso);
        
        throwError(!paInstance, `Cliente com id ${pontoAcesso} não encontrado`);
        
        const olt = await context.db.OLT.findById(paInstance.get('olt'));
        throwError(!olt, `O Cliente não está associado a nenhuma OLT!`);
        
        const sinal = await (await FiberhomeService.instance())
        .getOnuOpticalInfo(olt.get('ip'), paInstance.get('slotNo'), paInstance.get('ponNo'), paInstance.get('macOnu'));
        
        return sinal.parsedResponse.values[0];
      } catch (err) {
        throw new Error(`${err.name}: ${err.message}`);
      }
    }),

    // consultarSinalONU(olt: Int!, slot: Int!, pon: Int!, onuMac: String!): SinalONU
    consultarSinalONU: compose(...authResolvers)(async (parent, {olt, slot, pon, onuMac}, context: ResolverContext, info) => {
      const oltInstance = await context.db.OLT.findById(olt);
      throwError(!oltInstance, `OLT ${olt} não encontrada!`);

      const sinal = await (await FiberhomeService.instance())
        .getOnuOpticalInfo(oltInstance.get('ip'), slot, pon, onuMac);

      return sinal.parsedResponse.values[0];
    }),
  },

  Mutation: {

  }
}
