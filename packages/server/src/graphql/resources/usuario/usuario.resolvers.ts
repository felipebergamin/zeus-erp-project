import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { UsuarioInstance } from "../../../models/UsuarioModel";
import { throwError } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const usuarioResolvers = {
  Usuario: {
    perfil: (parent: UsuarioInstance, args, context: ResolverContext, info: GraphQLResolveInfo) => {
      return context.db.PerfilUsuario.findById(parent.get('perfil'));
    }
  },

  Query: {
    listUsers: compose(...authResolvers)((parent, { first = 10, offset = 0, excluded = false }, context: ResolverContext, info: GraphQLResolveInfo) => {
      return context.db.Usuario.findAll({
        limit: first,
        offset,
        paranoid: !excluded,
      });
    }),
  },

  Mutation: {
    createUser: compose(...authResolvers)((parent, args, context: ResolverContext, info: GraphQLResolveInfo) => {
      return context.db.sequelize.transaction((transaction: Transaction) => {
        return context.db.Usuario.create(args.input, { transaction });
      });
    }),

    updateUser: compose(...authResolvers)((parent, { id, input }, context: ResolverContext, info) => {
      const idUser = parseInt(id, 10);
      throwError(isNaN(idUser), `ID ${id} inválido`);

      return context.db.sequelize.transaction((transaction) => {
        return context.db.Usuario.findById(idUser)
          .then((user) => {
            throwError(!user, `Usuário com ID ${idUser} não encontrado`);

            return user.update(input, { transaction });
          });
      });
    }),

    deleteUser: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      const idUser = parseInt(id, 10);
      throwError(isNaN(idUser), `ID ${id} inválido`);

      return context.db.sequelize.transaction((transaction) => {
        return context.db.Usuario.findById(idUser)
          .then((user) => {
            throwError(!user, `Usuário com ID ${idUser} não encontrado`);

            return user.destroy({ transaction })
              .then((destroyed) => !!destroyed);
          });
      });
    }),

    restoreUser: compose(...authResolvers)((parent, { id }, context: ResolverContext, info) => {
      const idUser = parseInt(id, 10);
      throwError(isNaN(idUser), `ID ${id} inválido`);

      return context.db.sequelize.transaction((transaction) => {
        return context.db.Usuario.findById(idUser)
          .then((user) => {
            throwError(!user, `Usuário com ID ${idUser} não encontrado`);

            return user.restore({ transaction })
              .then((restored) => !!restored);
          });
      });
    }),

  },
};
