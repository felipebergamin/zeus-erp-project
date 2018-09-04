import { Request, Response } from 'express';
import * as moment from 'moment';
import * as QRCode from 'qrcode';

import db from '../../models';

export default async (req: Request, res: Response) => {
  const chamadoInstance = await db.Chamado.findById(req.params.chamadoid,
  {
    include: [ // Chamado
      {
        model: db.PontoAcesso,

        include: [ // PontoAcesso
          {
            model: db.Cliente,
          },
          {
            model: db.Plano,
          }
        ],
      }
    ]
  });

  if (!chamadoInstance) return res.status(404).send('<h1>Chamado não encontrado</h1>');

  const chamado = chamadoInstance.toJSON();
  const qrcodeurl = await QRCode.toDataURL(`zeus-chamado-${req.params.chamadoid}`);
  chamado.createdAt = moment(chamado.createdAt).format('DD/MM/YY HH:mm') as any;
  res.render('chamado', { chamado, qrcodeurl });
  res.end();
};
