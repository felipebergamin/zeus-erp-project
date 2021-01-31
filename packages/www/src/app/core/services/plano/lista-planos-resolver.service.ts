import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Plano } from '../../models/Plano';
import { PlanoService } from './plano.service';

@Injectable({
  providedIn: 'root'
})
export class ListaPlanosResolver implements Resolve<Plano[]> {

  constructor(private _service: PlanoService) {}

  resolve(): Observable<Plano[]> {
    return this._service.listar({ nopaginate: true })
      .pipe(map(res => res.listarPlanos));
  }
}