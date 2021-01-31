import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Plano } from '../../models/Plano';
import { PlanoService } from './plano.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoByIDResolver implements Resolve<Plano> {

  constructor(private _service: PlanoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Plano> {
    const id = parseInt(route.queryParamMap.get('idplano') || route.paramMap.get('idplano'), 10);

    if (!id) {
      return of(null);
    }

    return this._service.getByID(id);
  }
}
