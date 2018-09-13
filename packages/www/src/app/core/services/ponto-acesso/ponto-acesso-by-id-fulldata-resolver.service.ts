import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { PontoAcesso } from '../../models/PontoAcesso';
import { PontoAcessoService } from './ponto-acesso.service';

@Injectable({
  providedIn: 'root'
})
export class PontoAcessoByIdFulldataResolver implements Resolve<PontoAcesso> {
  private routeparamname = 'idpontoacesso';

  constructor(private _service: PontoAcessoService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PontoAcesso> {
    const id = parseInt(route.paramMap.has(this.routeparamname) ?
      route.paramMap.get(this.routeparamname) :
      route.queryParamMap.get(this.routeparamname), 10);

    return id ? this._service.getByID(id, true) : null;
  }
}
