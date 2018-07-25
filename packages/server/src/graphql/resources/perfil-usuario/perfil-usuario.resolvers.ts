import { Transaction } from "sequelize";

import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const perfilUsuarioResolvers = {

  Query: {
    listUserProfiles: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.PerfilUsuario.findAll();
    })
  },

  Mutation: {
    createUserProfile: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.sequelize.transaction((t: Transaction) => {
        return context.db.PerfilUsuario.create(args.input, { transaction: t });
      });
    }),

    updateUserProfile: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      const idPerfil = parseInt(id, 10);
      throwError(isNaN(idPerfil), `ID ${id} inválido`);

      return context.db.sequelize.transaction((transaction) => {
        return context.db.PerfilUsuario.findById(idPerfil)
          .then((perfil) => {
            throwError(!perfil, `Perfil com ID ${idPerfil} não encontrado`);

            return perfil.update(input, { transaction });
          });
      });
    }),

    deleteUserProfile: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      const idPerfil = parseInt(id, 10);
      throwError(isNaN(idPerfil), `ID ${id} inválido`);

      return context.db.sequelize.transaction((transaction) => {
        return context.db.PerfilUsuario.findById(idPerfil)
          .then((perfil) => {
            throwError(!perfil, `Perfil com ID ${idPerfil} não encontrado`);

            return perfil.destroy({ transaction })
              .then((destroyed) => !!destroyed);
          });
      });
    }),

  }
};
