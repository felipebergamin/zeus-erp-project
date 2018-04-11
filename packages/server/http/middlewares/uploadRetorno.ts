import { Request, Response } from "express";
import formidable = require("formidable");
import util = require('util');

import debug = require('../../debug');

export = async (req: Request, res: Response, next: (err?: Error) => void) => {
  debug(`formidable middleware: recebido Content-Type: ${req.header('Content-Type')}`);
  const form = new formidable.IncomingForm();

  if (!req.header('Content-Type').toLowerCase().includes('multipart/form-data')) {
    return next();
  }

  debug('Parsing form-data');
  form.parse(req, (err, fields, files) => {
    if (err) {
      debug('Erro ao parsear form-data');
      debug(err);
      return res.status(500).end();
    }

    if (fields) {
      req.body = fields;
    }

    // se há um arquivo de retorno enviado
    if ("retorno" in files) {
      debug('Retorno recebido');
      // atribui o arquivo para a propriedade "files" do request
      req.files = { retorno: files.retorno };
    } else {
      debug('Retorno não recebido');
      // se não foi enviado um retorno,
      req.files = null;
    }

    // passa o controle para o próximo middleware
    next();
  });
};
