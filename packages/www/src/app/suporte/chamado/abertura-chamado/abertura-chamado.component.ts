import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter, debounceTime } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { valueIn } from '../../../form-validators/value-in';
import { PontoAcessoService } from '../../../core/services/ponto-acesso/ponto-acesso.service';
import { PontoAcesso } from '../../../core/models/PontoAcesso';
import { FiberhomeService } from '../../../core/services/fiberhome/fiberhome.service';
import { MatAutocompleteSelectedEvent, MatSnackBar } from '../../../../../node_modules/@angular/material';
import { SinalOnu } from '../../../core/services/fiberhome/fiberhome.graphql';
import { Chamado } from '../../../core/models/Chamado';
import { ChamadoService } from '../../../core/services/chamado/chamado.service';

@Component({
  selector: 'app-abertura-chamado',
  templateUrl: './abertura-chamado.component.html',
  styleUrls: ['./abertura-chamado.component.scss']
})
export class AberturaChamadoComponent implements OnInit, OnDestroy {
  autoCompleteControl = new FormControl('');
  motivosAbertura = ['Conexão Lenta', 'Sem Conexão', 'Cancelamento'];
  prioridades = [
    { value: 1, viewValue: 'Crítica' },
    { value: 2, viewValue: 'Alta' },
    { value: 3, viewValue: 'Normal' },
    { value: 4, viewValue: 'Baixa' },
  ];
  displayedColumns = ['abertoEm', 'motivoAbertura', 'abertoPor', 'finalizadoEm', 'problema', 'tecnico'];
  showDetailedInfo = false;
  pontosAcesso$ = new BehaviorSubject<PontoAcesso[]>([]);
  chamadosAnteriores$ = new BehaviorSubject<Chamado[]>([]);
  sinal: SinalOnu;
  form: FormGroup;

  constructor(
    private paService: PontoAcessoService,
    private fiberhome: FiberhomeService,
    private chamadoService: ChamadoService,
    private snackbar: MatSnackBar,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      mensagem: new FormControl(null, Validators.required),
      motivoAbertura: new FormControl(null, Validators.required),
      pontoAcesso: new FormControl(null, Validators.required),
      prioridade: new FormControl(3, [Validators.required, valueIn([1, 2, 3, 4])]),
      tecnico: new FormControl(null),
    });

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
    this.chamadosAnteriores$.complete();
  }

  displayFn(pa: PontoAcesso): string {
    return pa ? pa.login : '';
  }

  onSelectPA(event: MatAutocompleteSelectedEvent) {
    if (typeof event.option.value === typeof {} && event.option.value._id) {
      const idPa = event.option.value._id;
      this.showDetailedInfo = true;
      this.form.get('pontoAcesso').setValue(idPa);

      this.fiberhome.consultarSinalPA(idPa)
        .subscribe(sinal => this.sinal = sinal);

      this.chamadoService.buscar({ pontoAcesso: idPa })
        .subscribe(chamados => this.chamadosAnteriores$.next(chamados));
    }
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('Ops! Verifique os dados digitados e tente novamente!', 'Ok');
    }

    this.chamadoService.abrirChamado(this.form.value)
      .subscribe(
        chamadoAberto => {
          if ('protocolo' in chamadoAberto) {
            this.snackbar.open(`Protocolo: ${chamadoAberto.protocolo}`, 'Ok');
            this.location.back();
          } else {
            this.snackbar.open('Ops, houve ume erro desconhecido!');
          }
        }
      );
  }

}
