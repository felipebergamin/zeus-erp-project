import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { debounceTime } from 'rxjs/operators';

import { Cliente } from '../../../core/models/Cliente';
import { Plano } from '../../../core/models/Plano';
import { IPPool } from '../../../core/models/IPPool';
import { OLT } from '../../../core/models/OLT';
import { PontoAcessoService } from '../../../core/services/ponto-acesso/ponto-acesso.service';

@Component({
  selector: 'app-form-ponto-acesso',
  templateUrl: './form-ponto-acesso.component.html',
  styleUrls: ['./form-ponto-acesso.component.scss']
})
export class FormPontoAcessoComponent implements OnInit {
  form: FormGroup;
  cliente: Cliente;

  listaPlanos: Plano[];
  listaPools: IPPool[];
  listaOlts: OLT[];

  constructor(
    private pontoAcessoService: PontoAcessoService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      autoAtrelarMac: [false],
      ipAddress: [null],
      login: [null, [Validators.required, Validators.email]],
      macAddress: [null],
      macOnu: [null],
      passwd: [null, Validators.required],
      ponNo: [null],
      slotNo: [null],
      incluirNaCobranca: [true],

      bairro: [null, Validators.required],
      cep: [null, Validators.required],
      cidade: [null, Validators.required],
      complemento: [null],
      estado: [null, Validators.required],
      latitude: [null],
      logradouro: [null, Validators.required],
      longitude: [null],
      numero: [null, Validators.required],

      olt: [null],
      plano: [null, Validators.required],
      pool: [null],
      cliente: [null, Validators.required],
    });

    this.route.data.subscribe(
      ({ cliente, listaPlanos, listaPools, listaOlts }) => {
        this.listaPlanos = listaPlanos;
        this.listaPools = listaPools;
        this.listaOlts = listaOlts;
        this.cliente = cliente;

        if (!cliente) {
          this.snackbar.open(`Erro, cliente não encontrado`, 'Ok');
          this.location.back();
        }
      }
    );

    this.form.get('login').valueChanges
      .pipe(debounceTime(600))
      .subscribe(typedLogin => {
        if (!typedLogin) { return null; }

        this.pontoAcessoService.loginAlreadyExists(typedLogin)
          .subscribe(exists => {

            if (exists) {
              this.form.get('login').setErrors({
                alreadyExists: true
              });
            }
          });
      });
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('Formulário inválido! Verifique os dados digitados', 'Ok');
    }

    this.form.patchValue({ cliente: this.cliente._id });

    this.pontoAcessoService.create(this.form.value)
      .subscribe(
        (created) => {
          if (created._id) {
            this.snackbar.open('PA cadastrado com sucesso!', 'Ok', { duration: 4000 });
            return this.location.back();
          }

          this.snackbar.open('Ops! Algo não parece bem, o servidor retornou um registro inválido', 'Ok');
        }
      );
  }

}
