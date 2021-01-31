import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { clearFalsyProps } from '../../../utils';
import { OltService } from '../../../core/services/olt/olt.service';
import { PlanoService } from '../../../core/services/plano/plano.service';
import { IpPoolService } from '../../../core/services/ip-pool/ip-pool.service';
import { OLT } from '../../../core/models/OLT';
import { Plano } from '../../../core/models/Plano';
import { IPPool } from '../../../core/models/IPPool';

@Component({
  selector: 'app-form-pesquisa-pa',
  templateUrl: './form-pesquisa-pa.component.html',
  styleUrls: ['./form-pesquisa-pa.component.scss']
})
export class FormPesquisaPaComponent implements OnInit {
  form: FormGroup;
  oltList$: Observable<OLT[]>;
  planosList$: Observable<Plano[]>;
  poolsList$: Observable<IPPool[]>;

  @Output() cancelSearch = new EventEmitter();
  @Output() doSearch = new EventEmitter();

  constructor(
    private olt: OltService,
    private plano: PlanoService,
    private pool: IpPoolService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      ipAddress: new FormControl(null),
      login: new FormControl(null),
      macOnu: new FormControl(null),
      ponNo: new FormControl(null),
      slotNo: new FormControl(null),
      incluirNaCobranca: new FormControl(null),
      logradouro: new FormControl(null),
      numero: new FormControl(null),
      bairro: new FormControl(null),
      cidade: new FormControl(null),
      olt: new FormControl(null),
      plano: new FormControl(null),
      pool: new FormControl(null),
    });

    console.log('FormPesquisaPaComponent onInit');
    this.oltList$ = this.olt.listar({ nopaginate: true }).pipe(map(res => res.listarOLTs));
    this.planosList$ = this.plano.listar({ nopaginate: true }).pipe(map(res => res.listarPlanos));
    this.poolsList$ = this.pool.listar({ nopaginate: true }).pipe(map(res => res.listarIPPools));
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
