import { IHeaderLabelRetorno } from "../../interfaces/IHeaderLabelRetorno";
import { ITraillerRetorno } from "../../interfaces/ITraillerRetorno";
import { ITransactionRetorno } from "../../interfaces/ITransactionRetorno";

export class Retorno {
  public header: IHeaderLabelRetorno;
  public transactions: ITransactionRetorno[];
  public trailler: ITraillerRetorno;

  constructor(file: string) {
    this.transactions = [];
    this.parseFileContent(file);
  }

  private validateFileContent(fileContent: string): boolean {
    const lines = fileContent.split('\n');

    if (lines.length < 2) {
      return false;
    }

    return lines.every((line: string) => line.trim().length === 400 || line.trim().length === 0);
  }

  private parseRegistry<T>(struct: any, text: string): T {
    const obj = {} as any;

    struct.forEach((registro: any) => {
      obj[registro.name] = text.substr(registro.start - 1, registro.size);
    });

    return obj as T;
  }

  private parseFileContent(fileContent: string) {
    const lines = fileContent.split('\n');

    while (lines.length > 0) {
      const line = lines.shift().trim();

      switch (line.charAt(0)) {
        case '0':
          this.header = this.parseHeader(line);
          break;
        case '1':
          this.transactions.push(this.parseTransaction(line));
          break;
        case '9':
          this.trailler = this.parseTrailler(line);
          break;
      }
    }
  }

  private parseHeader(headerStr: string): IHeaderLabelRetorno {
    const headerStruct = [
      {
        end: 1, name: 'idRegistro', size: 1, start: 1,
      },
      {
        end: 2, name: 'idRetorno', size: 1, start: 2,
      },
      {
        end: 9, name: 'literalRetorno', size: 7, start: 3,
      },
      {
        end: 11, name: 'codigoServico', size: 2, start: 10,
      },
      {
        end: 26, name: 'literalServico', size: 15, start: 12,
      },
      {
        end: 46, name: 'codigoEmpresa', size: 20, start: 27,
      },
      {
        end: 76, name: 'nomeEmpresa', size: 30, start: 47,
      },
      {
        end: 79, name: 'numeroBradesco', size: 3, start: 77,
      },
      {
        end: 94, name: 'nomeBanco', size: 15, start: 80,
      },
      {
        end: 100, name: 'dataArquivo', size: 6, start: 95,
      },
      {
        end: 108, name: 'densidadeGravacao', size: 8, start: 101,
      },
      {
        end: 113, name: 'numeroAvisoBancario', size: 5, start: 109,
      },
      {
        end: 385, name: 'dataCredito', size: 6, start: 380,
      },
      {
        end: 400, name: 'sequenciaRegistro', size: 6, start: 395,
      },
    ];

    return this.parseRegistry<IHeaderLabelRetorno>(headerStruct, headerStr);
  }

  private parseTransaction(line: string): ITransactionRetorno {
    const transactionStruct = [
      {
        end: 1, name: 'idRegistro', size: 1, start: 1,
      },
      {
        end: 3, name: 'tipoInscricaoEmpresa', size: 2, start: 2,
      },
      {
        end: 17, name: 'numeroInscricao', size: 14, start: 4,
      },
      {
        end: 37, name: 'idEmpresaBeneficiaria', size: 17, start: 21,
      },
      {
        end: 62, name: 'numeroControle', size: 25, start: 38,
      },
      {
        end: 82, name: 'idTitulo', size: 12, start: 71,
      },
      {
        end: 105, name: 'idRateio', size: 1, start: 105,
      },
      {
        end: 107, name: 'pagamentoParcial', size: 2, start: 106,
      },
      {
        end: 108, name: 'carteira', size: 1, start: 108,
      },
      {
        end: 110, name: 'idOcorrencia', size: 2, start: 109,
      },
      {
        end: 116, name: 'dataOcorrencia', size: 6, start: 111,
      },
      {
        end: 126, name: 'numeroDocumento', size: 10, start: 117,
      },
      {
        end: 146, name: 'idTituloBanco', size: 20, start: 127,
      },
      {
        end: 152, name: 'vencimentoTitulo', size: 6, start: 147,
      },
      {
        end: 165, name: 'valorTitulo', size: 13, start: 153,
      },
      {
        end: 168, name: 'bancoCobrador', size: 3, start: 166,
      },
      {
        end: 173, name: 'agenciaCobradora', size: 5, start: 169,
      },
      {
        end: 188, name: 'despesaCobranca', size: 13, start: 176,
      },
      {
        end: 201, name: 'outrasDespesas', size: 13, start: 189,
      },
      {
        end: 214, name: 'jurosAtraso', size: 13, start: 202,
      },
      {
        end: 227, name: 'iof', size: 13, start: 215,
      },
      {
        end: 240, name: 'abatimento', size: 13, start: 228,
      },
      {
        end: 253, name: 'descontoConcedido', size: 13, start: 241,
      },
      {
        end: 266, name: 'valorPago', size: 13, start: 254,
      },
      {
        end: 279, name: 'jurosMora', size: 13, start: 267,
      },
      {
        end: 292, name: 'outrosCreditos', size: 13, start: 280,
      },
      {
        end: 295, name: 'motivoOcorrencia', size: 1, start: 295,
      },
      {
        end: 301, name: 'dataCredito', size: 6, start: 296,
      },
      {
        end: 304, name: 'origemPagamento', size: 3, start: 302,
      },
      {
        end: 318, name: 'chequeBradesco', size: 4, start: 315,
      },
      {
        end: 328, name: 'motivoRejeicao', size: 10, start: 319,
      },
      {
        end: 370, name: 'numeroCartorio', size: 2, start: 369,
      },
      {
        end: 380, name: 'numeroProtocolo', size: 10, start: 371,
      },
      {
        end: 400, name: 'sequenciaRegistro', size: 6, start: 395,
      },
    ];

    return this.parseRegistry<ITransactionRetorno>(transactionStruct, line);
  }

  private parseTrailler(line: string): ITraillerRetorno {
    const registroTrailler = [
      {
        end: 1, name: 'idRegistro', size: 1, start: 1,
      },
      {
        end: 2, name: 'idRetorno', size: 1, start: 2,
      },
      {
        end: 4, name: 'tipoRegistro', size: 2, start: 3,
      },
      {
        end: 7, name: 'codigoBanco', size: 3, start: 5,
      },
      {
        end: 25, name: 'quantidadeTitulos', size: 8, start: 18,
      },
      {
        end: 39, name: 'valorTotal', size: 14, start: 26,
      },
      {
        end: 47, name: 'numeroAvisoBancario', size: 8, start: 40,
      },
      {
        end: 62, name: 'quantidadeRegistros02', size: 5, start: 58,
      },
      {
        end: 74, name: 'valorRegistros02', size: 12, start: 63,
      },
      {
        end: 86, name: 'valorRegistros', size: 12, start: 75,
      },
      {
        end: 91, name: 'quantidadeRegistros06', size: 5, start: 87,
      },
      {
        end: 103, name: 'valorRegistros06', size: 12, start: 92,
      },
      {
        end: 108, name: 'quantidadeRegistrosBaixados', size: 5, start: 104,
      },
      {
        end: 120, name: 'valorRegistrosBaixados', size: 12, start: 109,
      },
      {
        end: 125, name: 'quantidadeRegistrosAbatimentoCancelado', size: 5, start: 121,
      },
      {
        end: 137, name: 'valorRegistrosAbatimentoCancelado', size: 12, start: 126,
      },
      {
        end: 142, name: 'quantidadeRegistrosVencimentoAlterado', size: 5, start: 138,
      },
      {
        end: 154, name: 'valorRegistrosVencimentoAlterado', size: 12, start: 143,
      },
      {
        end: 159, name: 'quantidadeRegistrosAbatimento', size: 5, start: 155,
      },
      {
        end: 171, name: 'valorRegistrosAbatimento', size: 12, start: 160,
      },
      {
        end: 176, name: 'quantidadeRegistrosConfirmacaoProtesto', size: 5, start: 172,
      },
      {
        end: 188, name: 'valorRegistrosConfirmacaoProtesto', size: 12, start: 177,
      },
      {
        end: 377, name: 'valorTotalRateios', size: 15, start: 363,
      },
      {
        end: 385, name: 'quantidadeRateios', size: 8, start: 378,
      },
      {
        end: 400, name: 'sequenciaRegistro', size: 6, start: 395,
      },
    ];

    return this.parseRegistry<ITraillerRetorno>(registroTrailler, line);
  }
}
