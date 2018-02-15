import { IContaBancaria } from "./IContaBancaria";
import { IEndereco } from "./IEndereco";
import { IOLT } from "./IOLT";
import { IPlano } from "./IPlano";

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

  /* informações de conexão */
  autoAtrelarMac: boolean;
  ipAddress: string;
  login: string;
  macAddress: string;
  macOnu: string;
  olt: string|IOLT;
  passwd: string;
  ponNo: number;
  slotNo: number;

  plano: string|IPlano;

  /* informações de endereço */
  enderecoResidencial: IEndereco;

  enderecoCorrespondencia: IEndereco;

  /* informações financeiras */
  autoBloquear: boolean;
  contaBancaria: string|IContaBancaria;
  diaVencimento: number;
  observacoes: string;
}
