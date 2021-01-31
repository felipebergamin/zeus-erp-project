import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import * as moment from 'moment';

import { PontoAcesso } from '../../core/models/PontoAcesso';
import { PontoAcessoService } from '../../core/services/ponto-acesso/ponto-acesso.service';
import { InstalacaoService } from '../../core/services/instalacao/instalacao.service';
import { Usuario } from '../../core/models/Usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-abrir-instalacao',
  templateUrl: './abrir-instalacao.component.html',
  styleUrls: ['./abrir-instalacao.component.scss']
})
export class AbrirInstalacaoComponent implements OnInit, OnDestroy {
  dataAgendamento = {
    min: moment(),
  };
  formasPagamento = [
    {
      value: 'cheque',
      viewValue: 'Cheque',
    },
    {
      value: 'dinheiro',
      viewValue: 'Dinheiro',
    },
    {
      value: 'cartao',
      viewValue: 'Cartão',
    },
    {
      value: 'boleto',
      viewValue: 'Boleto',
    },
  ];
  autoCompleteControl = new FormControl('');
  pontosAcesso$ = new Subject<PontoAcesso[]>();
  form: FormGroup;
  listaTecnicos: Usuario[];
  showAutocompleteControl = true;
  paSelecionado: PontoAcesso;

  constructor(
    private paService: PontoAcessoService,
    private instalacaoService: InstalacaoService,
    private snackbar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      pontoAcesso: new FormControl(null, Validators.required),
      observacoesAtendente: new FormControl(null, Validators.required),
      dataAgenda: new FormControl(null, Validators.required),
      cobrado: new FormControl(true, Validators.required),
      valor: new FormControl(null),
      modoPagamento: new FormControl(null, Validators.required),
      observacoesPagamento: new FormControl(null, Validators.required),
      tecnicoResponsavel: new FormControl(null),
    });

    this.route.data.subscribe(
      ({listaTecnicos, pontoAcesso}) => {
        this.listaTecnicos = listaTecnicos;

        if (pontoAcesso) {
          this.showAutocompleteControl = false;
          this.form.patchValue({pontoAcesso: pontoAcesso._id});
          this.paSelecionado = pontoAcesso;
        }
      }
    );

    this.autoCompleteControl.valueChanges
      .pipe(
        filter(value => (typeof value === typeof '') && value.length > 0),
        debounceTime(1000),
      )
      .subscribe((value: string) => {
        this.paService.buscar({ login:  value })
          .subscribe(pas => this.pontosAcesso$.next(pas));
      });
  }

  ngOnDestroy() {
    this.pontosAcesso$.complete();
  }

  displayFn(pa: PontoAcesso): string {
    return pa ? pa.login : '';
  }

  onSelectPA(event: MatAutocompleteSelectedEvent) {
    if (typeof event.option.value === typeof {} && event.option.value._id) {
      const idPa = event.option.value._id;
      this.paSelecionado = event.option.value;
      this.form.get('pontoAcesso').setValue(idPa);
    }
  }

  onFormSubmit() {
    this.form.patchValue({pontoAcesso: this.paSelecionado._id});
    if (this.form.valid) {
      this.instalacaoService.abrirInstalacao(this.form.value)
        .subscribe(created => {
          this.snackbar.open(`Instalação aberta com sucesso! Protocolo: ${created.protocolo}`);
          this.location.back();
        });
    } else {
      this.snackbar.open(`Erro no formulário, por favor, verifique os dados digitados!`, 'Ok');
    }
  }

  cancel() {
    this.router.navigate(['/cliente/pa']);
  }
}
