import gql from 'graphql-tag';

import { OcorrenciaBancaria } from '../../models/OcorrenciaBancaria';

export interface UploadRetornoMutation {
  uploadRetorno: OcorrenciaBancaria[];
}

export const UPLOAD_RETORNO_MUTATION = gql`
  mutation uploadRetorno($input: UploadRetornoInput!) {
    uploadRetorno(input: $input) {
      agenciaCobradora
      bancoCobrador
      dataCredito
      dataHora
      dataOcorrenciaNoBanco
      idOcorrencia
      jurosMora
      motivosOcorrencia
      valorPago
      boleto {
        _id
      }
      arquivoRetorno {
        _id
        nomeArquivo
      }
    }
  }
`;
