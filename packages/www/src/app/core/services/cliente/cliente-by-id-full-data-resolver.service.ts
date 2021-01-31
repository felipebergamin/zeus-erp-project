import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteByIdFullDataResolver implements Resolve<Cliente> {

  constructor(
    private _service: ClienteService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Cliente> {
    if (!route.paramMap.has('cliente')) {
      return of(null);
    }

    const cliente = +route.paramMap.get('cliente');
    return this._service.getById(cliente, true)
      .pipe(map(res => res.getCustomerByID));
  }
}
