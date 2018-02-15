import { ContaBancaria } from "../models/ContaBancaria";
import { Endereco } from "../models/Endereco";
import { OLT } from "../models/OLT";
import { Plano } from "../models/Plano";

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
  olt: string|OLT;
  passwd: string;
  ponNo: number;
  slotNo: number;

  plano: string|Plano;

  /* informações de endereço */
  enderecoResidencial: Endereco;

  enderecoCorrespondencia: Endereco;

  /* informações financeiras */
  autoBloquear: boolean;
  contaBancaria: string|ContaBancaria;
  diaVencimento: number;
  observacoes: string;
}
