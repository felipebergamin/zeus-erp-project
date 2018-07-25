import { IContaBancaria } from "./IContaBancaria";
import { IEndereco } from "./IEndereco";
import { IOLT } from "./IOLT";
import { IPlano } from "./IPlano";
import { IPontoDeAcesso } from "./IPontoDeAcesso";

export interface ICliente {
  _id: string;
  alteradoEm: Date;
  criadoEm: Date;
  excluidoEm: Date;

  excluido: boolean;

  /* informações pessoa */
  cpfCnpj: string;
  dataNascimento: Date;
  nome: string;
  rgIe: string;
  tags: string[];
  tipoPessoa: string;

  /* informações de contato */
  email: string;
  numeroCelular: string;
  telefoneFixo: string;

  pontosDeAcesso: [ IPontoDeAcesso ];

  /* informações de endereço */
  enderecoCobranca: IEndereco;

  /* informações financeiras */
  autoBloquear: boolean;
  contaBancaria: string|IContaBancaria;
  diaVencimento: number;
  observacoes: string;
}
