import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Boleto } from '../../../core/models/Boleto';

@Component({
  selector: 'app-detalhar-boleto',
  templateUrl: './detalhar-boleto.component.html',
  styleUrls: ['./detalhar-boleto.component.scss']
})
export class DetalharBoletoComponent implements OnInit {
  displayedColumns = [
    'id' ,
    'dataOcorrencia',
    'bancoCobrador',
    'agenciaCobradora',
    'valorPago',
    'jurosMora',
    'arquivoRetorno',
  ];
  boleto: Boleto;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      ({boleto}) => {
        if (!boleto) {
          return this.location.back();
        }

        this.boleto = boleto;
      }
    );
  }

}
