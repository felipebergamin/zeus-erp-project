import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Cliente } from '../../../core/models/Cliente';
import { PlanoService } from '../../../core/services/plano/plano.service';
import { Plano } from '../../../core/models/Plano';
import { IpPoolService } from '../../../core/services/ip-pool/ip-pool.service';
import { IPPool } from '../../../core/models/IPPool';
import { OLT } from '../../../core/models/OLT';
import { OltService } from '../../../core/services/olt/olt.service';
import { PontoAcessoService } from '../../../core/services/ponto-acesso/ponto-acesso.service';

@Component({
  selector: 'app-form-ponto-acesso',
  templateUrl: './form-ponto-acesso.component.html',
  styleUrls: ['./form-ponto-acesso.component.scss']
})
export class FormPontoAcessoComponent implements OnInit {
  form: FormGroup;
  cliente: Cliente;

  listaPlanos$: Observable<Plano[]>;
  listaPools$: Observable<IPPool[]>;
  listaOlts$: Observable<OLT[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private planoService: PlanoService,
    private poolService: IpPoolService,
    private oltService: OltService,
    private pontoAcessoService: PontoAcessoService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
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

    const idCliente = +this.activatedRoute.snapshot.paramMap.get('cliente');
    if (isNaN(idCliente)) {
      this.router.navigate(['/', 'cliente', 'pa']);
    }

    this.clienteService.getById(idCliente)
      .subscribe(cliente => {
        if (!cliente) {
          this.router.navigate(['/', 'cliente', 'pa']);
        }

        this.form.patchValue({ cliente: cliente._id });
        this.cliente = cliente;

        this.listaOlts$ = this.oltService.listar({ nopaginate: true }).pipe(map(res => res.listarOLTs));
        this.listaPlanos$ = this.planoService.listar({ nopaginate: true }).pipe(map(res => res.listarPlanos));
        this.listaPools$ = this.poolService.listar({ nopaginate: true }).pipe(map(res => res.listarIPPools));

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
            return this.router.navigate(['/', 'cliente', 'pa']);
          }

          this.snackbar.open('Ops! Algo não parece bem, o servidor retornou um registro inválido', 'Ok');
        }
      );
  }

}
