import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { PontoAcesso } from '../../models/PontoAcesso';
import { PontoAcessoService } from './ponto-acesso.service';

@Injectable({
  providedIn: 'root'
})
export class PontosAcessoPorClienteResolver implements Resolve<PontoAcesso[]> {

  constructor(private _service: PontoAcessoService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PontoAcesso[]> {
    if (!route.paramMap.has('cliente')) {
      return of(null);
    }

    return this._service.pasDoCliente(+route.paramMap.get('cliente'));
  }
}
