import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ContaBancaria } from '../../models/ContaBancaria';
import { ContaBancariaService } from './conta-bancaria.service';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaByIdResolver implements Resolve<ContaBancaria> {

  constructor(private _service: ContaBancariaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ContaBancaria> {
    const id = parseInt(route.paramMap.get('idcontabancaria') || route.queryParamMap.get('idcontabancaria'), 10);

    return this._service.getByID(id);
  }
}
