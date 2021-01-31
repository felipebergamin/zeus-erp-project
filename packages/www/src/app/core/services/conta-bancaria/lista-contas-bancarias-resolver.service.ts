import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContaBancaria } from '../../models/ContaBancaria';
import { ContaBancariaService } from './conta-bancaria.service';

@Injectable({
  providedIn: 'root'
})
export class ListaContasBancariasResolver implements Resolve<ContaBancaria[]> {

  constructor(private _service: ContaBancariaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContaBancaria[]> {
    return this._service.list({ nopaginate: true })
      .pipe(map(res => res.listBankAccounts));
  }
}
