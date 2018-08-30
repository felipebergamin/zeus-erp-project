import gql from 'graphql-tag';

export const UPLOAD_RETORNO_MUTATION = gql`
  mutation uploadRetorno($input: UploadRetornoInput!) {
    uploadRetorno(input: $input) {
      _id

      contaBancaria {
        _id
        nome
      }
      dataGravacao
      nomeArquivo
      processado
      quantidadeOperacoes

      qtdeRegistrosConfirmados
      valorRegistrosConfirmados
      valorRegistrosLiquidados
      qtdeRegistrosLiquidados
      valorRegistros06
      qtdeRegistrosBaixados
      valorRegistrosBaixados
      qtdeRegistrosVencimentoAlterado
      valorRegistrosVencimentoAlterado

      ocorrencias {
        _id

        idOcorrencia
        dataOcorrenciaNoBanco
        bancoCobrador
        agenciaCobradora
        valorPago
        jurosMora
        dataCredito
        motivosOcorrencia
        dataHora

        boleto {
          _id
          valorCobranca

          cliente {
            _id
            nome
          }
        }
      }

      createdAt
    }
  }
`;
