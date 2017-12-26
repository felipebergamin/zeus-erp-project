import bcrypt = require('bcrypt-nodejs');
import { Schema } from 'mongoose';
import email = require('../fields/email');

const UsuarioSchema = new Schema({
  ativo: {
    default: true,
    type: Boolean,
  },
  email,
  login: {
    required: [true, 'O login é necessário'],
    type: String,
  },
  nome: {
    required: [true, 'O nome é necessário'],
    type: String,
  },
  passwd: {
    type: String,
  },

  alterado_em: require('../fields/alterado_em'),
  criado_em: require('../fields/criado_em'),
  excluido_em: require('../fields/excluido_em'),
});

UsuarioSchema.pre('save', function preSave(next: (arg?: any) => void) {
  const user = this;

  if (!user.isModified('passwd')) {
    return next();
  }

  const SALT = bcrypt.genSaltSync(5);
  const PASSWD_HASH = bcrypt.hashSync(user.passwd, SALT);
  user.passwd = PASSWD_HASH;

  next();

  /* bcrypt.genSalt(5, (genSaltError: Error, salt: string) => {
    if (genSaltError) {
      return next(genSaltError);
    }

    bcrypt.hash(user.passwd, salt, null, (hashError: Error, hash: string) => {
      if (hashError) {
        return next(hashError);
      }

      user.passwd = hash;
      next();
    });
  }); */
});

UsuarioSchema.methods.checkPasswd = function checkPasswd(password: string, callback: (match: boolean) => void) {
  const match = bcrypt.compareSync(password, this.passwd);

  return match;
};

export = UsuarioSchema;
