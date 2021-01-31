import { Cliente } from './Cliente';
import { Boleto } from './Boleto';

export class Carne {
  _id?: number;
  cliente?: Cliente;
  descricao?: string;
  boletos?: Boleto[];
}
