import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { clearFalsyProps } from '../../../utils';

@Component({
  selector: 'app-form-pesquisa-cliente',
  templateUrl: './form-pesquisa-cliente.component.html',
  styleUrls: ['./form-pesquisa-cliente.component.scss']
})
export class FormPesquisaClienteComponent implements OnInit {
  form: FormGroup;

  @Output() doSearch = new EventEmitter();
  @Output() cancelSearch = new EventEmitter();

  constructor() { }

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
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.doSearch.emit(clearFalsyProps(this.form.value));
    }
  }

  cancel() {
    this.cancelSearch.emit();
  }

}
