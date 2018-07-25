import jwt = require('jwt-simple');
import moment = require('moment');
import { UsuarioModel } from '../models/UsuarioModel';

export class LoginService {
  private secret = '4PP_S3CR3T_JWT';

  constructor(private Usuario: UsuarioModel) { }

  public decode(token: string): any {
    return jwt.decode(token, this.secret);
  }

  public async auth(login: string, passwd: string) {
    const usuario = await this.Usuario.findOne({ where: { login } });

    if (usuario && usuario.isPassword(usuario.get('passwd'), passwd)) {
      const expires = moment().add(12, "h").valueOf();
      const token = jwt.encode({
        expires,
        iss: usuario.get('_id'),
      }, this.secret);

      return {
        expires,
        token,
        usuario,
      };
    }

    return false;
  }
}
