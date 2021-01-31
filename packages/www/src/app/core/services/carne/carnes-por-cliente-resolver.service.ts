import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Carne } from '../../models/Carne';
import { CarneService } from './carne.service';

@Injectable({
  providedIn: 'root'
})
export class CarnesPorClienteResolver implements Resolve<Carne[]> {

  constructor(private _service: CarneService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Carne[]> {
    if (!route.paramMap.has('cliente')) {
      return of(null);
    }

    return this._service.listarCarnesPorCliente(+route.paramMap.get('cliente'));
  }
}
