import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  formFunction: 'creating' | 'updating';
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
    private router: Router,
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
      ({ cliente, listaPlanos, listaPools, listaOlts, pontoAcesso }) => {
        this.listaPlanos = listaPlanos;
        this.listaPools = listaPools;
        this.listaOlts = listaOlts;
        this.cliente = cliente;

        if (!pontoAcesso) {
          this.formFunction = 'creating';
          if (!cliente) {
            this.snackbar.open(`Erro, cliente não encontrado`, 'Ok');
            this.location.back();
          }
        } else {
          this.formFunction = 'updating';

          this.form.addControl('id', new FormControl(pontoAcesso._id, Validators.required));
          this.form.removeControl('cliente');

          this.cliente = pontoAcesso.cliente;
          this.form.patchValue({
            ...pontoAcesso,
            cliente: pontoAcesso.cliente._id,
            olt: pontoAcesso.olt._id,
            plano: pontoAcesso.plano._id,
            pool: pontoAcesso.pool ? pontoAcesso.pool._id : null,
          });
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
    this.form.patchValue({ cliente: this.cliente._id });

    if (!this.form.valid) {
      return this.snackbar.open('Formulário inválido! Verifique os dados digitados', 'Ok');
    }

    if (this.formFunction === 'creating') {

      this.pontoAcessoService.create(this.form.value)
        .subscribe(
          (created) => {
            if (created._id) {
              this.snackbar.open('PA cadastrado com sucesso!', 'Ok', { duration: 4000 });
              this.router.navigate(['/suporte/instalacao/abrir'], { queryParams: { idpontoacesso: created._id } });
              return;
            }
            this.snackbar.open('Ops! Algo não parece bem, o servidor retornou um registro inválido', 'Ok');
          }
        );
    } else {
      const { id, ...input } = this.form.value;

      this.pontoAcessoService.update(id, input)
        .subscribe(
          updated => {
            this.snackbar.open(`PA ${updated._id} alterado com sucesso!`, 'Ok', { duration: 4000 });
            this.location.back();
          }
        );
    }
  }

}
