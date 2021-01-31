import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OLT } from '../../models/OLT';
import { OltService } from './olt.service';


@Injectable({
  providedIn: 'root'
})
export class ListaOltResolver implements Resolve<OLT[]> {

  constructor(private _service: OltService) { }

  resolve(): Observable<OLT[]> {
    return this._service.listar({ nopaginate: true })
      .pipe(map(res => res.listarOLTs));
  }
}
