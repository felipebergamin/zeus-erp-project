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
      const usuario: any = await Usuario.findOne({login}).exec();

      if (usuario) {
        usuario.checkPasswd(passwd, (match: boolean) => {
          if (!match) {
            return res.status(401).send();
          }

          const expires = moment().add(3, 'days').valueOf();
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
        });
      }
    } else {
      res.status(401).send();
    }
  }

  private static secret = '4PP_S3CR3T_JWT';
}
