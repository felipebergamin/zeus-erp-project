import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Cliente } from '../../../core/models/Cliente';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Boleto } from '../../../core/models/Boleto';
import { BoletoService } from '../../../core/services/boleto/boleto.service';
import { ComponentPageTitle } from '../../../shared/page-title/page-title';
import { LancarBoletoComponent } from '../lancar-boleto/lancar-boleto.component';
import { PontoAcesso } from '../../../core/models/PontoAcesso';
import { PontoAcessoService } from '../../../core/services/ponto-acesso/ponto-acesso.service';
import { CarneService } from '../../../core/services/carne/carne.service';
import { Carne } from '../../../core/models/Carne';

@Component({
  selector: 'app-detalhes-cliente',
  templateUrl: './detalhes-cliente.component.html',
  styleUrls: ['./detalhes-cliente.component.scss']
})
export class DetalhesClienteComponent implements OnInit {
  displayedColumns = ['menu', 'numero', 'valor', 'vencimento'];
  displayedColumnsForPAs = ['paMenu', 'paLogin', 'paPlano', 'paEndereco'];
  displayedColumnsForCarne = ['menu', 'descricaoCarne', 'idCarne', 'qtdeParcelasCarne'];
  cliente: Cliente;
  boletos: Boleto[] = [];
  pontosAcesso: PontoAcesso[] = [];
  carnes: Carne[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private boletoService: BoletoService,
    public pageTitle: ComponentPageTitle,
    private dialog: MatDialog,
    private paService: PontoAcessoService,
    private carneService: CarneService,
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

            this.paService.pasDoCliente(this.cliente._id)
              .subscribe(
                resPAs => this.pontosAcesso = resPAs
              );

            this.carneService.listarCarnesPorCliente(this.cliente._id)
              .subscribe(
                resCarnes => {
                  this.carnes = resCarnes;
                  console.log(this.carnes);
                }
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
