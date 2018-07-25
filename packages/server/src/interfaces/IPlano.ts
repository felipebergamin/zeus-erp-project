export interface IPlano {
  _id: string;
  alteradoEm: Date;
  criadoEm: Date;

  descricao: string;
  nome: string;
  valorMensal: number;
  velocidadeDownload: number;
  velocidadeUpload: number;
}
