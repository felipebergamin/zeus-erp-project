import { map } from 'rxjs/operators';

import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { throwError } from "../../../util/utils";

import { FiberhomeService } from '../../../services/FiberhomeService';

export const fiberhomeResolvers = {

  Query: {
    consultarSinalONUPA: compose(...authResolvers)(async (parent, { pontoAcesso }, context: ResolverContext, info) => {
      try {

        const paInstance = await context.db.PontoAcesso.findById(pontoAcesso);

        throwError(!paInstance, `Cliente com id ${pontoAcesso} não encontrado`);

        const olt = await context.db.OLT.findById(paInstance.get('olt'));
        throwError(!olt, `O Cliente não está associado a nenhuma OLT!`);

        return (await FiberhomeService.instance()).tl1Client
          .getOpticalModuleInformation({
            OLTID: olt.get('ip'),
            PONID: `NA-NA-${paInstance.get('slotNo')}-${paInstance.get('ponNo')}`,
            ONUIDTYPE: 'MAC',
            ONUID: paInstance.get('macOnu'),
          })
          .pipe(map(res => res.result.values.pop()))
          .toPromise();
      } catch (err) {
        throw new Error(`${err.name}: ${err.message}`);
      }
    }),
  },

  Mutation: {

  }
}
