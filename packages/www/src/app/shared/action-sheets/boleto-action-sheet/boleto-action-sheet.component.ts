import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Boleto } from '../../../core/models/Boleto';
import { Router } from '@angular/router';
import { CarneService } from '../../../core/services/carne/carne.service';
import { Carne } from '../../../core/models/Carne';
import { MatSnackBar, MatDialog } from '@angular/material';
import { BoletoService } from '../../../core/services/boleto/boleto.service';
import { FormBoletoComponent } from '../../boleto/form-boleto/form-boleto.component';

@Component({
  selector: 'app-boleto-action-sheet',
  templateUrl: './boleto-action-sheet.component.html',
  styleUrls: ['./boleto-action-sheet.component.scss']
})
export class BoletoActionSheetComponent implements OnInit {
  @Input('boleto') boleto: Boleto;
  @Input('disabled') disabled = false;

  /** emite eventos com o objeto Boleto que foi atualizado */
  @Output('updateBoleto') updateBoleto = new EventEmitter();

  carnes: Carne[];

  constructor(
    private boletoService: BoletoService,
    private carneService: CarneService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  detalhesBoleto() {
    this.router.navigate(['/financeiro/boletos', this.boleto._id]);
  }

  atrelarAoCarne(carne: Carne) {
    this.carneService.atrelarBoletoCarne(this.boleto._id, carne._id)
      .subscribe(result => {
        this.updateBoleto.emit(this.boleto);
        this.snackbar.open(
          result ? `Atrelado ao carnê com sucesso!` : 'Erro ao atrelar ao carnê',
          'Ok',
          { duration: 4000 });
      });
  }

  removerDeCarne() {
    this.carneService.removeBoletoDoCarne(this.boleto._id)
      .subscribe(result => {
        this.updateBoleto.emit(this.boleto);
        this.snackbar.open(
          result ? `Removido com sucesso!` : 'Erro ao remover boleto do carnê',
          'Ok',
          { duration: 4000 });
      });
  }

  pedidoBaixa() {
    this.boletoService.pedidoBaixa(this.boleto._id)
      .subscribe(result => {
        this.updateBoleto.emit(this.boleto);
        this.snackbar.open(
          result ? `Pedido de baixa registrado!` : 'Erro ao enviar pedido de baixa!',
          'Ok',
          { duration: 4000 });
      });
  }

  cancelarPedidoBaixa() {
    this.boletoService.cancelarPedidoBaixa(this.boleto._id)
      .subscribe(result => {
        this.updateBoleto.emit(this.boleto);
        this.snackbar.open(
          result ? `Pedido de baixa cancelado!` : 'Erro na operação!',
          'Ok',
          { duration: 4000 },
        );
      });
  }

  alterar(boleto: Boleto) {
    this.dialog.open(FormBoletoComponent, { data: { boleto } })
      .afterClosed()
      .subscribe(
        result => {
          if (result) {
            this.updateBoleto.emit(result);
          }
        }
      );
  }

  onMenuOpened() {
    this.carneService.listarCarnesPorCliente(this.boleto.cliente._id)
      .subscribe(carnes => this.carnes = carnes);
  }

  onMenuClosed() {
    this.carnes = null;
  }

}
