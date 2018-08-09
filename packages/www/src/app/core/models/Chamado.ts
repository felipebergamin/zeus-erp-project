import { Usuario } from './Usuario';
import { Cliente } from './Cliente';
import { PontoAcesso } from './PontoAcesso';
import { Boleto } from './Boleto';
import { ProblemaChamado } from './ProblemaChamado';

export type FormaPagamento = 'cheque' | 'dinheiro' | 'cartao' | 'boleto';
export type Prioridade = 'baixa' | 'normal' | 'alta' | 'critica';

export class Chamado {
  _id?: number;
  cancelado?: boolean;
  canceladoEm?: Date;
  canceladoPor?: number;
  motivoCancelamento?: string;

  finalizado?: boolean;
  finalizadoEm?: Date;
  imagemAssinatura?: string;
  observacoesTecnico?: string;
  problema?: ProblemaChamado;

  boletoCobranca?: Boleto;
  formaPagamento?: FormaPagamento;
  /* se o chamado deveria ser cobrado de acordo com as regras da empresa */
  geraCobranca?: boolean;
  /* isentar a cobrança mesmo se o chamado deveria ter sido cobrado */
  isentarCobranca?: boolean;
  valorACobrar?: number;
  recebidoEm?: Date;
  recebidoPor?: number;

  abertoPor?: Usuario;
  mensagem?: string;
  motivoAbertura?: string;
  sinalOnuAbertura?: number;
  sinalOnuFechamento?: number;

  pontoAcesso?: PontoAcesso;

  prioridade?: Prioridade;
  protocolo?: string;
  tecnico?: Usuario;

  createdAt?: Date;
  updatedAt?: Date;
}
