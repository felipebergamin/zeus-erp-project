import { Component, OnInit, Input } from '@angular/core';
import { OcorrenciaBancaria } from '../../../core/models/OcorrenciaBancaria';
import { ArquivoRetorno } from '../../../core/models/ArquivoRetorno';

@Component({
  selector: 'app-exibir-detalhes-retorno',
  templateUrl: './exibir-detalhes-retorno.component.html',
  styleUrls: ['./exibir-detalhes-retorno.component.scss']
})
export class ExibirDetalhesRetornoComponent implements OnInit {
  arquivo: ArquivoRetorno;
  displayedColumns = [
    'id' ,
    // 'dataOcorrencia',
    'bancoCobrador',
    'agenciaCobradora',
    'valorPago',
    'jurosMora',
    // 'dataCredito',
    // 'motivosOcorrencia',
    'boleto',
    'cliente',
  ];

  @Input('arquivoProcessado')
  set arquivoProcessado(arquivo) {
    this.arquivo = arquivo;
  }

  constructor() { }

  ngOnInit() {
  }

}
