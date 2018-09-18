import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Boleto } from '../../models/Boleto';
import { BoletoService } from '../../services/boleto/boleto.service';

@Injectable({
  providedIn: 'root'
})
export class BoletosPorClienteResolver implements Resolve<Boleto[]> {

  constructor(private _service: BoletoService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Boleto[]> {
    if (!route.paramMap.has('cliente')) {
      return of(null);
    }

    return this._service.pesquisar({ cliente: route.paramMap.get('cliente') });
  }
}
