import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { clearFalsyProps } from '../../../utils';

@Component({
  selector: 'app-form-pesquisa-cliente',
  templateUrl: './form-pesquisa-cliente.component.html',
  styleUrls: ['./form-pesquisa-cliente.component.scss']
})
export class FormPesquisaClienteComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormPesquisaClienteComponent>,
    @Inject(MAT_DIALOG_DATA) private injectedData,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(),
      logradouro: new FormControl(),
      numero: new FormControl(),
      rgIe: new FormControl(),
      cpfCnpj: new FormControl(),
      cidade: new FormControl(),
      bairro: new FormControl(),
      dataNascimento: new FormControl(),
      createdAt: new FormControl(),
      tipoPessoa: new FormControl(),
    });

    if (this.injectedData
      && this.injectedData.previousSearchValues
      && typeof this.injectedData.previousSearchValues === typeof {}) {

      this.form.patchValue(this.injectedData.previousSearchValues);
    }
  }

  onFormSubmit() {
    this.dialogRef.close(clearFalsyProps(this.form.value));
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
