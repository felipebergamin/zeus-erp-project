import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Boleto } from '../../models/Boleto';
import { BoletoService } from '../../services/boleto/boleto.service';

@Injectable({
  providedIn: 'root'
})
export class BoletoByIdResolver implements Resolve<Boleto> {

  constructor(private _service: BoletoService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Boleto> {
    if (!route.paramMap.has('idboleto')) {
      return of(null);
    }

    return this._service.getByID(parseInt(route.paramMap.get('idboleto'), 10));
  }
}
