import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import * as moment from 'moment';

import { Cliente } from '../../../core/models/Cliente';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { CarneService } from '../../../core/services/carne/carne.service';
import { ClienteService } from '../../../core/services/cliente/cliente.service';

@Component({
  selector: 'app-lancar-carne',
  templateUrl: './lancar-carne.component.html',
  styleUrls: ['./lancar-carne.component.scss']
})
export class LancarCarneComponent implements OnInit {
  cliente: Cliente;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LancarCarneComponent>,
    private clienteService: ClienteService,
    private carneService: CarneService,
    private snackbar: MatSnackBar,
  ) {

    this.cliente = data.cliente;
  }

  ngOnInit() {
    this.form = this.fb.group({
      cliente: [null, Validators.required],
      descricao: [null, Validators.required],

      parcelas: [6, Validators.required],
      valorParcelas: [null],
      primeiroVencimento: [new Date()],
    });

    this.clienteService.getById(this.cliente._id)
      .subscribe(
        cli => {
          this.form.patchValue({
            cliente: cli.getCustomerByID._id,
            valorParcelas: cli.valorTotalMensalidadeCliente,
            primeiroVencimento: this.proximoVencimento(cli.getCustomerByID.diaVencimento),
          });
        }
      )
  }

  proximoVencimento(dia: number): moment.Moment {
    const vencimento = moment().date(dia);

    if (vencimento.isAfter(moment())) {
      return vencimento;
    }

    vencimento.add(1, 'month');
    return vencimento;
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.carneService.addCarne(this.form.value)
        .subscribe(
          carneCriado => {
            if (carneCriado) {
              this.snackbar.open(`Carnê criado! ${carneCriado._id}`);
              return this.dialogRef.close(carneCriado);
            }

            this.snackbar.open(`Não foi possível criar o carnê. O servidor retornou dados inválidos!`);
            console.log(carneCriado);
          }
        )
    }
  }

  cancelar() {
    this.dialogRef.close(null);
  }

}
