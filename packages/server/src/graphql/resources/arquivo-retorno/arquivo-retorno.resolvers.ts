import * as fs from 'fs';
import * as path from 'path';

import * as debug from '../../../debug';
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { ArquivoRetornoInstance } from "../../../models/ArquivoRetornoModel";
import { Retorno } from '../../../services/cnab';
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

function storeFile({ stream, filename }): Promise<string> {
  return new Promise((resolve, reject) => {
    const filepath = path.resolve(__dirname, `../../../../storage/${filename}`);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    stream.on('error', (err) => {
      if (stream.truncated) {
        // Delete the truncated file
        fs.unlinkSync(filepath);
      }
      reject(err);
    });

    stream
      .pipe(fs.createWriteStream(filepath))
      .on('error', (err) => reject(err))
      .on('finish', () => resolve(filepath));
  });
}

export const arquivoRetornoResolvers = {

  ArquivoRetorno: {
    contaBancaria: (parent: ArquivoRetornoInstance, args, context: ResolverContext, info) => {
      return context.db.ContaBancaria.findById(parent.get('contaBancaria'));
    },
  },

  Query: {
    listarArquivosRetorno: compose(...authResolvers)((parent, { first = 10, offset = 0 }, context: ResolverContext, info) => {
      return context.db.ArquivoRetorno.findAll({
        limit: first,
        offset,
      });
    }),

    totalArquivosRetorno: compose(...authResolvers)((parent, args, context: ResolverContext, info) => {
      return context.db.ArquivoRetorno.count();
    }),
  },

  Mutation: {
    uploadRetorno: compose(...authResolvers)((parent, { input }, context: ResolverContext, info) => {

      return new Promise((resolve, reject) => {
        const { contaBancaria, file } = input;

        file.then(({ stream, filename }) => {

          storeFile({ stream, filename })
            .then((filepath) => {
              debug('File saved: ', filepath);
              const parser = new Retorno();

              parser
                .once('done', (result) => {
                  debug('Processamento do Arquivo OK');
                  resolve(result);
                })
                .once('error', (err) => {
                  debug('Erro no processamento do arquivo');
                  reject(err);
                });

              parser.parseFile(filepath, contaBancaria);
            });
        });
      });
    }),
  }
};
