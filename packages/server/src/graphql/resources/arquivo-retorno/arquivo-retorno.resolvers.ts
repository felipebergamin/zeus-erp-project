import * as fs from 'fs';
import { tmpdir } from 'os';

import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { ArquivoRetornoInstance } from "../../../models/ArquivoRetornoModel";
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";

function storeFile({ stream, filename }) {
  const filepath = `${tmpdir()}/${filename}`;
  return new Promise((resolve, reject) => {
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
    uploadRetorno: compose(...authResolvers)(async (parent, { file }, context: ResolverContext, info) => {
      const { stream, filename } = await file;
      storeFile({ stream, filename }).then(
        (result) => console.log(result)
      );

      return true;
    }),
  }
};
