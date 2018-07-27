import { ContaBancaria } from './ContaBancaria';

export class Cliente {
  _id?: number;

  /* informações pessoa */
  cpfCnpj?: string;
  dataNascimento?: Date;
  nome?: string;
  rgIe?: string;
  tags?: string;
  tipoPessoa?: string;

  /* informações de contato */
  email?: string;
  numeroCelular?: string;
  telefoneFixo?: string;

  /* informações de endereço */
  bairro?: string;
  cep?: string;
  cidade?: string;
  complemento?: string;
  estado?: string;
  latitude?: number;
  logradouro?: number;
  longitude?: number;
  numero?: number;

  /* informações financeiras */
  autoBloquear?: boolean;
  contaBancaria?: ContaBancaria;
  diaVencimento?: number;
  observacoes?: string;
}
