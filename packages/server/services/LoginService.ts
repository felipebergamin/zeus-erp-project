import jwt = require('jwt-simple');
import moment = require('moment');
import { instanceDB } from "../db/initConnection";
import { RepositoryUsuario } from "./repository/repository-usuario";

export class LoginService {
  private secret = '4PP_S3CR3T_JWT';

  constructor(private repoUsuario: RepositoryUsuario) { }

  public decode(token: string): any {
    return jwt.decode(token, this.secret);
  }

  public async auth(login: string, passwd: string) {
    const usuario = await this.repoUsuario.auth(login, passwd);

    if (typeof usuario === "object") {
      const expires = moment().add(12, "h").valueOf();
      const token = jwt.encode({
        expires,
        iss: usuario._id,
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
