import bcrypt = require('bcrypt-nodejs');
import { Schema } from 'mongoose';
import email = require('../fields/email');

const UsuarioSchema = new Schema({
  dataAniversario: {
    type: Date,
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
    required: [true, 'A senha para o usuário é necessária'],
    type: String,
  },
});

UsuarioSchema.pre('save', function preSave(next: (arg?: any) => void) {
  const user = this;

  if (!user.isModified('passwd')) {
    return next();
  }

  bcrypt.genSalt(5, (genSaltError: Error, salt: string) => {
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
  });
});

UsuarioSchema.methods.checkPasswd = (password: string, next: (arg?: any) => void) => {
  bcrypt.compare(password, this.passwd, (err, isMatch) => {
    if (err) {
      return next(err);
    }
    next(isMatch);
  });
};

export = UsuarioSchema;
