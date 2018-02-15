import { ContaBancaria } from "./ContaBancaria";
import { Endereco } from "./Endereco";
import { OLT } from "./OLT";
import { Plano } from "./Plano";

export class Cliente {
  public alteradoEm: Date;
  public criadoEm: Date;
  public excluidoEm: Date;

  public excluido: boolean;

  /* informações pessoa */
  public cpfCnpj: string;
  public dataNascimento: Date;
  public nome: string;
  public rgIe: string;
  public tags: string[];
  public tipoPessoa: string;

  /* informações de contato */
  public email: string;
  public numeroCelular: string;
  public telefoneFixo: string;

  /* informações de conexão */
  public autoAtrelarMac: boolean;
  public ipAddress: string;
  public login: string;
  public macAddress: string;
  public macOnu: string;
  public olt: string|OLT;
  public passwd: string;
  public ponNo: number;
  public slotNo: number;

  public plano: string|Plano;

  /* informações de endereço */
  public enderecoResidencial: Endereco;

  public enderecoCorrespondencia: Endereco;

  /* informações financeiras */
  public autoBloquear: boolean;
  public contaBancaria: string|ContaBancaria;
  public diaVencimento: number;
  public observacoes: string;
}
