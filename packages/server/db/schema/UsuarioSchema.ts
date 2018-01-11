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
  perfil: {
    ref: "PerfilUsuario",
    required: [true, "É necessário um perfil para o usuário"],
    type: Schema.Types.ObjectId,
  },
  telegramID: String,
  tipo: {
    enum: [
      "tecnico",
      "atendente",
      "gerente",
      "outro",
    ],
    required: [true, "É necessário definir o tipo de usuário"],
    type: String,
  },

  alteradoEm: require('../fields/alterado_em'),
  criadoEm: require('../fields/criado_em'),
  excluidoEm: require('../fields/excluido_em'),
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
});

UsuarioSchema.methods.checkPasswd = function checkPasswd(password: string, callback: (match: boolean) => void) {
  const match = bcrypt.compareSync(password, this.passwd);

  return match;
};

// nunca exportar o passwd
UsuarioSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.passwd;
  return obj;
};

export = UsuarioSchema;
