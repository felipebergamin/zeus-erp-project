import { IEndereco } from "./IEndereco";
import { IOLT } from "./IOLT";
import { IPlano } from "./IPlano";

export interface IPontoDeAcesso {
  autoAtrelarMac: boolean;
  ipAddress?: string;
  login: string;
  macAddress?: string;
  macOnu?: string;
  olt: string|IOLT;
  passwd: string;
  ponNo?: number;
  slotNo?: number;

  incluirNaCobranca: boolean;
  plano: string|IPlano;

  /* informações de endereço */
  endereco: IEndereco;
}
