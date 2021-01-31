import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { MikrotikRouterService } from './mikrotik-router.service';
import { MikrotikRouter } from '../../models/MikrotikRouter';

@Injectable({
  providedIn: 'root'
})
export class MikrotikRouterByIDResolver implements Resolve<MikrotikRouter> {

  constructor(private _service: MikrotikRouterService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MikrotikRouter> {
    const id = parseInt(route.paramMap.get('idrouter') || route.queryParamMap.get('idrouter'), 10);

    if (!id) {
      return of(null);
    }

    return this._service.getByID(id);
  }
}
