import { Request, Response } from 'express';
import jwt = require('jwt-simple');
import moment = require('moment');
import { instanceDB } from "../../db/initConnection";
import { LoginService } from "../../services/LoginService";

export class LoginController {
  private secret = '4PP_S3CR3T_JWT';

  constructor(private loginService: LoginService) {}

  public async checkLogin(req: Request, res: Response) {
    const { login, passwd } = req.body;

    const auth = await this.loginService.auth(login, passwd);

    if (auth) {
      return res.json(auth);
    }

    return res.status(401).send();

    /* if (login && passwd) {
      const usuario: any = await Usuario.findOne({login})
        .populate("perfil")
        .exec();

      if (usuario) {
        if (await usuario.checkPasswd(passwd)) {
          const expires = moment().add(12, "h").valueOf();
          const token = jwt.encode({
            expires,
            iss: usuario._id,
          }, this.secret);

          const user = usuario.toObject();
          delete user.passwd;

          return res.json({
            expires,
            token,
            user,
          });
        }
      }
    } */
  }
}
