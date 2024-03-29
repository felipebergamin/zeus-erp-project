import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatBottomSheet } from '@angular/material';

import { Cliente } from '../../../core/models/Cliente';
import { Boleto } from '../../../core/models/Boleto';
import { ComponentPageTitle } from '../../../shared/page-title/page-title';
import { PontoAcesso } from '../../../core/models/PontoAcesso';
import { Carne } from '../../../core/models/Carne';
import { LancarCarneComponent } from '../lancar-carne/lancar-carne.component';
import { PontoAcessoActionSheetComponent } from '../../ponto-acesso/ponto-acesso-action-sheet/ponto-acesso-action-sheet.component';
import { BoletoService } from '../../../core/services/boleto/boleto.service';
import { FormBoletoComponent } from '../../../shared/boleto/form-boleto/form-boleto.component';

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
    public pageTitle: ComponentPageTitle,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private boletoService: BoletoService,
  ) { }

  getBoletosOfCarne(carne: Carne) {
    return this.boletos.filter(b => b.carne && (b.carne._id === carne._id));
  }

  getBoletosWithoutCarne() {
    return this.boletos.filter(b => !b.carne);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      ({ boletos, carnes, cliente, pontosAcesso }) => {

        this.cliente = cliente;
        this.boletos = boletos;
        this.pontosAcesso = pontosAcesso;
        this.carnes = carnes;
        setTimeout(() => this.pageTitle.title = cliente.nome);
      }
    );
  }

  novoBoleto(cliente: Cliente) {
    this.dialog.open(FormBoletoComponent, {
      data: { cliente }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.boletos = [result, ...this.boletos];
        }
      }
    );
  }

  novoCarne(cliente: Cliente) {
    this.dialog.open(LancarCarneComponent, {
      data: { cliente }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.boletos = [
            ...result.boletos.map(b => {
              b.carne = { _id: result._id };
              return b;
            }),
            ...this.boletos];
          result.boletos = null;
          this.carnes = [result, ...this.carnes];
        }
      }
    );
  }

  openBottomSheetForPA(pa: PontoAcesso) {
    this.bottomSheet.open(PontoAcessoActionSheetComponent, {
      data: pa
    });
  }

  onUpdateBoleto(event: Boleto) {
    this.boletoService.getByID(event._id)
      .subscribe(updated => {
        this.boletos = this.boletos.map(b => b._id === event._id ? updated : b);
      });
  }

}
