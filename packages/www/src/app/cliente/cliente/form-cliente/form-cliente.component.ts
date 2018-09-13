import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { ContaBancaria } from '../../../core/models/ContaBancaria';
import { CPFCNPJValidator } from '../../../form-validators/cpf-cnpj-validator';
import { valueIn } from '../../../form-validators/value-in';
import { CpfCnpjAlreadyExists } from '../../../form-validators/cpf-cnpj-already-exists';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {
  form: FormGroup;
  contasBancarias: ContaBancaria[];
  formFunction: 'creating' | 'updating';

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      cpfCnpj: [null, [Validators.required, Validators.minLength(11)]],
      dataNascimento: [null, Validators.required],
      nome: [null, Validators.required],
      rgIe: [null, Validators.required],
      tags: [null],
      tipoPessoa: [null, [Validators.required, valueIn(['fisica', 'juridica'])]],

      email: [null, [Validators.required, Validators.email]],
      numeroCelular: [null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      telefoneFixo: [null, [Validators.maxLength(10), Validators.minLength(10)]],

      bairro: [null, Validators.required],
      cep: [null, Validators.required],
      cidade: [null, Validators.required],
      complemento: [null],
      estado: [null, Validators.required],
      latitude: [null],
      logradouro: [null, Validators.required],
      longitude: [null],
      numero: [null, Validators.required],

      autoBloquear: [true, Validators.requiredTrue],
      contaBancaria: [null, Validators.required],
      diaVencimento: [10, [Validators.required, valueIn([10, 20, 30])]],
      observacoes: [null],
    }, { validator: CPFCNPJValidator });

    this.route.data.subscribe(
      ({ contasBancarias, cliente }) => {
        this.contasBancarias = contasBancarias;

        // se existe um cliente nos dados da rota
        // então o formulário está sendo usado para atualizar informações
        if (cliente) {
          console.log(cliente);
          this.formFunction = 'updating';

          this.form.addControl('_id', new FormControl(cliente._id, Validators.required));

          this.form.patchValue({
            ...cliente,
            contaBancaria: cliente.contaBancaria._id,
            dataNascimento: new Date(cliente.dataNascimento),
          });
        } else { // se não existe um cliente nos dados da rota
          // então o formulário está senod usado para cadastrar um novo cliente
          this.formFunction = 'creating';
          this.form.get('cpfCnpj').setAsyncValidators(CpfCnpjAlreadyExists(this.clienteService));
        }
      }
    );
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('Os dados são inválidos', 'Ok', { duration: 5000 });
    }

    if (this.formFunction === 'creating') {
      this.clienteService.create(this.form.value)
        .subscribe(
          (res) => {
            this.snackbar.open(`ID do cliente: ${res._id}`, 'Ok', { duration: 4000 });
            this.location.back();
          },
          (err) => console.error(err),
        );
    } else {
      const {
        _id,
        ...input
      } = this.form.value;

      this.clienteService.update(_id, input)
        .subscribe(
          res => {
            this.snackbar.open(`Cliente ${res._id} alterado com sucesso!`, 'Ok', { duration: 4000 });
            this.location.back();
          },
          err => console.error(err),
        );
    }

  }
}
