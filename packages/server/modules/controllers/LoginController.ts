import { Request, Response } from 'express';
import jwt = require('jwt-simple');
import moment = require('moment');
import Usuario = require('../../db/model/Usuario');

export class LoginController {

  public static decode(token: string): any {
    return jwt.decode(token, this.secret);
  }

  public static async checkLogin(req: Request, res: Response) {
    const { login, passwd } = req.body;

    if (login && passwd) {
      const usuario: any = await Usuario.findOne({login})
        .populate("perfil")
        .exec();

      if (usuario) {
        if (usuario.checkPasswd(passwd)) {
          const expires = moment().add(12, "h").valueOf();
          const token = jwt.encode({
            expires,
            iss: usuario._id,
          }, LoginController.secret);

          const user = usuario.toObject();
          delete user.passwd;

          return res.json({
            expires,
            token,
            user,
          });
        }
      }
    }

    res.status(401).send();
  }

  private static secret = '4PP_S3CR3T_JWT';
}
