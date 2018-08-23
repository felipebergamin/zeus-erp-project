import { GraphQLResolveInfo } from "graphql";
import * as jwt from 'jsonwebtoken';

import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { UsuarioInstance } from "../../../models/UsuarioModel";
import { JWT_SECRET } from "../../../util/utils";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

export const tokenResolvers = {

  Query: {
    currentUser: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.Usuario.findById(context.authUser._id);
    }),

    isAuth: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return true;
    }),
  },

  Mutation: {
    createToken: (parent, { login, passwd }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Usuario.findOne({
        attributes: [ '_id', 'passwd' ],
        where: { login },
      }).then((user: UsuarioInstance) => {

        const errorMessage: string = 'Unauthorized, wrong email or password';

        if (!user || !user.isPassword(user.get('passwd'), passwd)) {
          throw new Error(errorMessage);
        }

        const payload = {
          sub: user.get('_id')
        };

        return {
          _id: user.get('_id'),
          token: jwt.sign(payload, JWT_SECRET, { expiresIn: '10h' }),
        };

      });
    },

    createQuickToken: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      const authUser = context.authUser;

      const payload = {
        sub: authUser._id
      };

      return {
        _id: authUser._id,
        token: jwt.sign(payload, JWT_SECRET, { expiresIn: '100ms' }),
      };
    }),
  }
};
