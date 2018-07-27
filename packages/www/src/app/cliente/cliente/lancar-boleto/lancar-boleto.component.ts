import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Cliente } from '../../../core/models/Cliente';
import { BoletoService } from '../../../core/services/boleto/boleto.service';

@Component({
  selector: 'app-lancar-boleto',
  templateUrl: './lancar-boleto.component.html',
  styleUrls: ['./lancar-boleto.component.scss']
})
export class LancarBoletoComponent implements OnInit {
  cliente: Cliente;
  form: FormGroup;
  today = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LancarBoletoComponent>,
    private clienteService: ClienteService,
    private boletoService: BoletoService,
  ) {

    this.cliente = data.cliente;
  }

  ngOnInit() {
    this.form = this.fb.group({
      dataVencimento: [null],
      valorCobranca: [null],
    });

    this.clienteService.getById(this.cliente._id)
      .subscribe(val => {
        this.form.patchValue({
          dataVencimento: this.proximoVencimento(val.getCustomerByID.diaVencimento),
          valorCobranca: val.valorTotalMensalidadeCliente,
        });
      });
  }

  cancel() {
    this.dialogRef.close(null);
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
    const inputValues = {
      contaBancaria: this.cliente.contaBancaria._id,
      cliente: this.cliente._id,
      ...this.form.value,
    };

    console.log(inputValues);

    this.boletoService.criar(inputValues)
      .subscribe(
        boleto => {
          this.dialogRef.close({
            ...inputValues,
            ...boleto,
          });
        }
      );
  }

}
