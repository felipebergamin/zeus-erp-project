import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Cliente } from '../../../core/models/Cliente';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Boleto } from '../../../core/models/Boleto';
import { BoletoService } from '../../../core/services/boleto/boleto.service';
import { ComponentPageTitle } from '../../../shared/page-title/page-title';
import { LancarBoletoComponent } from '../lancar-boleto/lancar-boleto.component';

@Component({
  selector: 'app-detalhes-cliente',
  templateUrl: './detalhes-cliente.component.html',
  styleUrls: ['./detalhes-cliente.component.scss']
})
export class DetalhesClienteComponent implements OnInit {
  displayedColumns = ['menu', 'numero', 'valor', 'vencimento'];
  cliente: Cliente;
  boletos: Boleto[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private boletoService: BoletoService,
    public pageTitle: ComponentPageTitle,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {

    if (this.activatedRoute.snapshot.paramMap.has('clienteID')) {
      const clienteID = +this.activatedRoute.snapshot.paramMap.get('clienteID');

      this.clienteService.getById(clienteID)
        .subscribe(
          res => {
            this.cliente = res.getCustomerByID;

            this.pageTitle.title = `Cliente ${this.cliente.nome}`;

            this.boletoService.pesquisar({ cliente: this.cliente._id, carne: null })
              .subscribe(
                resBoletos => this.boletos = [...resBoletos]
              );
          }
        );
    }
  }

  novoBoleto(cliente: Cliente) {
    this.dialog.open(LancarBoletoComponent, {
      data: { cliente }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.boletos = [result, ...this.boletos];
        }
      }
    );
  }

}
