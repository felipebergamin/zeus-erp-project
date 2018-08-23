import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

import { ContaBancaria } from '../../../core/models/ContaBancaria';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Cliente } from '../../../core/models/Cliente';
import { MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import { RemessaService } from '../../../core/services/remessa/remessa.service';

@Component({
  selector: 'app-gerar-remessa',
  templateUrl: './gerar-remessa.component.html',
  styleUrls: ['./gerar-remessa.component.scss']
})
export class GerarRemessaComponent implements OnInit, OnDestroy {
  autoCompleteControl = new FormControl('');
  today = new Date();
  clientes$ = new Subject<Cliente[]>();
  form: FormGroup;
  contasBancarias: ContaBancaria[];

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private remessaService: RemessaService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      contaBancaria: new FormControl(null, Validators.required),
      dataInicio: new FormControl(null),
      dataFim: new FormControl(null),
      cliente: new FormControl(null),
      enviarPedidoBaixa: new FormControl(false),
      enviarAtualizacaoValor: new FormControl(false),
      enviarAtualizacaoVencimento: new FormControl(false),
      reenviarRemetidos: new FormControl(false),
    });

    this.route.data.subscribe(
      data => {
        this.contasBancarias = data.contasBancarias;
      }
    );

    this.autoCompleteControl.valueChanges
      .pipe(
        filter(value => (typeof value === typeof '') && value.length > 0),
        debounceTime(1000),
      )
      .subscribe((value: string) => {
        this.clienteService.search({ nome: value })
          .subscribe(clientes => this.clientes$.next(clientes));
      });
  }

  ngOnDestroy() {
    this.clientes$.complete();
  }

  onSelectClient(event: MatAutocompleteSelectedEvent) {
    this.form.patchValue({ cliente: event.option.value._id });
  }

  displayFn(cli: Cliente) {
    return cli ? cli.nome : '';
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.remessaService.gerarRemessa(this.form.value)
        .subscribe(
          created => {
            this.snackbar.open(`Criado arquivo ${created.nomeArquivo} com ${created.quantidadeOperacoes} operações`,
              'Ok', { duration: 4500 });
          }
        );
    }
  }

  clearSelectedClient(component) {
    this.form.patchValue({ cliente: null });
    console.log(component);
    component.value = '';
    this.clientes$.next([]);
  }

}
