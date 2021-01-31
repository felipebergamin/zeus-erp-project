import { Cliente } from './Cliente';

export class PontoAcesso {
  _id?: number;

  autoAtrelarMac?: boolean;
  ipAddress?: string;
  login?: string;
  macAddress?: string;
  macOnu?: string;
  olt?: any;
  passwd?: string;
  ponNo?: number;
  slotNo?: number;

  bairro?: string;
  cep?: string;
  cidade?: string;
  complemento?: string;
  estado?: string;
  latitude?: number;
  logradouro?: string;
  longitude?: number;
  numero?: string;

  incluirNaCobranca?: boolean;
  plano?: any;
  cliente?: Cliente;
}
