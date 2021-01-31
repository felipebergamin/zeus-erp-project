import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MikrotikRouterService } from './mikrotik-router.service';
import { MikrotikRouter } from '../../models/MikrotikRouter';

@Injectable({
  providedIn: 'root'
})
export class MikrotikRoutersListResolver implements Resolve<MikrotikRouter[]> {

  constructor(private _service: MikrotikRouterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MikrotikRouter[]> {
    return this._service.mikrotikRoutersList({ nopaginate: true })
      .pipe(map(res => res.mikrotikRoutersList));
  }
}
