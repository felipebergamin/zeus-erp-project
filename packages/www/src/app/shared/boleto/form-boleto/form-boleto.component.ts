import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Cliente } from '../../../core/models/Cliente';
import { BoletoService } from '../../../core/services/boleto/boleto.service';
import { Boleto } from '../../../core/models/Boleto';

@Component({
  selector: 'app-form-boleto',
  templateUrl: './form-boleto.component.html',
  styleUrls: ['./form-boleto.component.scss']
})
export class FormBoletoComponent implements OnInit {
  cliente: Cliente;
  boleto: Boleto;
  form: FormGroup;
  today = new Date();

  formFunction: 'create' | 'update';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormBoletoComponent>,
    private clienteService: ClienteService,
    private boletoService: BoletoService,
  ) {

    const { cliente, boleto } = data;

    if (boleto) {
      this.formFunction = 'update';

      this.boleto = boleto;
      this.cliente = this.boleto.cliente;
    } else if (cliente) {
      this.formFunction = 'create';
      this.cliente = cliente;
    } else {
      throw new Error(`Um cliente ou boleto deve ser informado`);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      dataVencimento: [null],
      valorCobranca: [null],
    });

    if (this.formFunction === 'create') {
      this.clienteService.getById(this.cliente._id)
        .subscribe(val => {
          this.form.patchValue({
            dataVencimento: this.proximoVencimento(val.getCustomerByID.diaVencimento),
            valorCobranca: val.valorTotalMensalidadeCliente,
          });
        });
    } else {
      this.form.addControl('id', new FormControl(this.boleto._id, Validators.required));
      this.form.patchValue(this.boleto);
    }
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
    console.log(this.form.value);

    if (this.formFunction === 'create') {
      const inputValues = {
        contaBancaria: this.cliente.contaBancaria._id,
        cliente: this.cliente._id,
        ...this.form.value,
      };

      this.boletoService.criar(inputValues)
        .subscribe(
          boleto => {
            this.dialogRef.close({
              ...inputValues,
              ...boleto,
              cliente: { _id: this.cliente._id },
            });
          }
        );
    } else {
      const { id, ...input } = this.form.value;
      this.boletoService.update(id, input)
        .subscribe(
          result => {
            this.dialogRef.close(result);
          }
        );
    }
  }

}
