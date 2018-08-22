import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { ChamadoInstance } from "../../../models/ChamadoModel";
import { generateProtocol } from "../../../util/generateProtocol";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const chamadoResolvers = {
  Chamado: {
    abertoPor: (parent: ChamadoInstance, args, context: ResolverContext, info) => {
      return context.db.Usuario.findById(parent.get('abertoPor'));
    },

    boletoCobranca: (parent: ChamadoInstance, args, context: ResolverContext, info) => {
      return context.db.Boleto.findById(parent.get('boletoCobranca'));
    },

    pontoAcesso: (parent: ChamadoInstance, args, context: ResolverContext, info) => {
      return context.db.PontoAcesso.findById(parent.get('pontoAcesso'));
    },

    tecnico: (parent: ChamadoInstance, args, context: ResolverContext, info) => {
      return context.db.Usuario.findById(parent.get('tecnico'));
    },

    canceladoPor: (parent: ChamadoInstance, args, context: ResolverContext, info) => {
      return context.db.Usuario.findById(parent.get('canceladoPor'));
    },

    recebidoPor: (parent: ChamadoInstance, args, context: ResolverContext, info) => {
      return context.db.Usuario.findById(parent.get('recebidoPor'));
    },

    problema: (parent: ChamadoInstance, args, context: ResolverContext, info) => {
      return context.db.ProblemaChamado.findById(parent.get('problema'));
    },
  },

  Query: {
    listarChamados: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.Chamado.findAll({
        limit: first,
        offset,
      });
    }),

    listarChamadosAbertos: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.Chamado.findAll({
        where: { finalizado: false, cancelado: false },
        limit: first,
        offset,
      })
    }),

    totalChamadosAbertos: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.Chamado.count({
        where: { finalizado: false, cancelado: false },
      });
    }),

    chamadoByID: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      return context.db.Chamado.findById(id);
    }),

    buscarChamados: compose(...authResolvers)((parent, { searchValues }, context: ResolverContext, info) => {
      return context.db.Chamado.findAll({ where: searchValues });
    }),
  },

  Mutation: {
    abrirChamado: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {
      input['abertoPor'] = context.authUser._id;
      input['protocolo'] = generateProtocol('C');

      return context.db.sequelize.transaction((transaction) => {
        return context.db.Chamado.create(input, { transaction });
      });
    }),

    cancelarChamado: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      input['cancelado'] = true;
      input['canceladoEm'] = new Date();
      input['canceladoPor'] = context.authUser._id;

      return context.db.sequelize.transaction((transaction) => {
        return context.db.Chamado.findById(id)
          .then((chamado) => {
            throwError(!chamado, `Chamado com id ${id} não encontrado`);
            /* não permite cancelar o chamado se o mesmo já foi cancelado anteriormente */
            throwError(chamado.get('cancelado'), `Chamado já cancelado anteriormente`);
            /* não permite cancelar o chamado se o mesmo já foi finalizado anteriormente */
            throwError(chamado.get('finalizado'), `Chamado já finalizado anteriormente`);

            chamado.set(input);
            return chamado.save({ transaction });
          });
      });
    }),

    finalizarChamado: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      return context.db.ProblemaChamado.findById(input.problema)
        .then((problema) => {
          throwError(!problema, `Problema com ID ${input.problema} não encontrado`);

          input['finalizado'] = true;
          input['geraCobranca'] = problema.get('geraCobranca');
          input['valorACobrar'] = problema.get('valorCobrado');
          input['tecnico'] = context.authUser._id;

          return context.db.sequelize.transaction((transaction) => {
            return context.db.Chamado.findById(id)
              .then((chamado) => {
                throwError(!chamado, `Chamado com id ${id} não encontrado`);
                /* não permite cancelar o chamado se o mesmo já foi cancelado anteriormente */
                throwError(chamado.get('cancelado'), `Chamado já cancelado anteriormente`);
                /* não permite cancelar o chamado se o mesmo já foi finalizado anteriormente */
                throwError(chamado.get('finalizado'), `Chamado já finalizado anteriormente`);

                chamado.set(input);
                return chamado.save({ transaction });
              });
          });
        });
    }),

    receberChamado: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      input['recebidoEm'] = new Date();
      input['recebidoPor'] = context.authUser._id;

      return context.db.sequelize.transaction((transaction) => {
        return context.db.Chamado.findById(id)
          .then((chamado) => {
            throwError(!chamado, `Chamado com id ${id} não encontrado`);
            /* não permite cancelar o chamado se o mesmo já foi cancelado anteriormente */
            throwError(chamado.get('cancelado'), `Chamado cancelado anteriormente`);
            /* não permite cancelar o chamado se o mesmo já foi finalizado anteriormente */
            throwError(!chamado.get('finalizado'), `Só é possível receber chamados que já foram finalizados`);

            chamado.set(input);
            return chamado.save({ transaction });
          });
      });
    }),
  },
};
