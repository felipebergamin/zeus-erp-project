import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { InstalacaoInstance } from "../../../models/InstalacaoModel";
import { generateProtocol } from "../../../util/generateProtocol";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const instalacaoResolvers = {
  Instalacao: {
    atendente: (parent: InstalacaoInstance, args, context: ResolverContext, info) => {
      return context.db.Usuario.findById(parent.get('atendente'));
    },

    pontoAcesso: (parent: InstalacaoInstance, args, context: ResolverContext, info) => {
      return context.db.PontoAcesso.findById(parent.get('pontoAcesso'));
    },

    tecnicoResponsavel: (parent: InstalacaoInstance, args, context: ResolverContext, info) => {
      return context.db.Usuario.findById(parent.get('tecnicoResponsavel'));
    },

    recebidoPor: (parent: InstalacaoInstance, args, context: ResolverContext, info) => {
      return context.db.Usuario.findById(parent.get('recebidoPor'));
    },

  },

  Query: {
    instalacoesDoDia: compose(...authResolvers)((parent, { day }, context: ResolverContext, info) => {
      return context.db.Instalacao.findAll({
        where: { dataAgenda: day }
      });
    }),

    listarInstalacoes: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.Instalacao.findAll({
        limit: first,
        offset
      });
    }),
  },

  Mutation: {
    abrirInstalacao: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {
      input['atendente'] = context.authUser._id;
      input['protocolo'] = generateProtocol('H');

      return context.db.sequelize.transaction((transaction) => {
        return context.db.Instalacao.create(input, { transaction });
      });
    }),

    atualizarInstalacao: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.Instalacao.findById(id)
          .then((instalacao) => {
            throwError(!instalacao, `Instalação com ID ${id} não encontrada`);
            throwError(!instalacao.get('cancelada'), `Impossível atualizar dados de uma instalação cancelada`);
            throwError(!instalacao.get('concluida'), `Impossível atualizar dados de uma instalação finalizada`);

            instalacao.set(input);
            return instalacao.save({ transaction });
          });
      });
    }),

    cancelarInstalacao: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        input['cancelada'] = true;
        input['dataHoraCancelada'] = new Date();

        return context.db.Instalacao.findById(id)
          .then((instalacao) => {
            throwError(!instalacao, `Instalação com ID ${id} não encontrada`);
            throwError(!instalacao.get('cancelada'), `Impossível cancelar instalação já cancelada anteriormente`);
            throwError(!instalacao.get('concluida'), `Impossível cancelar instalação já concluída`);

            instalacao.set(input);
            return instalacao.save({ transaction });
          });
      });
    }),

    receberInstalacao: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {
        return context.db.Instalacao.findById(id)
          .then((instalacao) => {
            input['pago'] = true;
            input['dataPagamento'] = true;
            input['recebidoPor'] = context.authUser._id;

            throwError(!instalacao, `Instalação com ID ${id} não encontrada`);
            throwError(instalacao.get('pago'), `Erro: Instalaçao já foi paga!`);
            throwError(instalacao.get('cancelada'), `Erro: Não é possível receber uma instalação cancelada`);

            instalacao.set(input);
            return instalacao.save({ transaction });
          });
      });
    }),

    finalizarInstalacao: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((transaction) => {

        return context.db.Instalacao.findById(id)
          .then((instalacao) => {
            throwError(!instalacao, `Instalação com ID ${id} não encontrada`);
            throwError(instalacao.get('concluida'), `Erro: Instalação já concluída anteriormente`);
            throwError(instalacao.get('cancelada'), `Erro: Instação já cancelada anteriormente`);

            instalacao.set({
              concluida: true,
              dataHoraConclusao: new Date(),
              tecnicoResponsavel: context.authUser._id
            });
            return instalacao.save({ transaction });
          });
      });
    }),
  },
};
