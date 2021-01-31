import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProblemaChamado } from '../../models/ProblemaChamado';
import { ProblemaChamadoService } from './problema-chamado.service';

@Injectable({
  providedIn: 'root'
})
export class ProblemaChamadoByIDResolver implements Resolve<ProblemaChamado> {

  constructor(private _service: ProblemaChamadoService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ProblemaChamado> {
    const id = parseInt(route.queryParamMap.get('idproblema') || route.paramMap.get('idproblema'), 10);

    if (!id) {
      return of(null);
    }

    return this._service.getByID(id);
  }
}
