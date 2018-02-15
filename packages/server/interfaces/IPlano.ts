export interface IPlano {
  alteradoEm: Date;
  criadoEm: Date;

  descricao: string;
  nome: string;
  valorMensal: number;
  velocidadeDownload: number;
  velocidadeUpload: number;
}
