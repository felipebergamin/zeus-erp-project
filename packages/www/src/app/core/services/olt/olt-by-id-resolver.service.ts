import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { OLT } from '../../models/OLT';
import { OltService } from './olt.service';

@Injectable({
  providedIn: 'root'
})
export class OltByIDResolver implements Resolve<OLT> {

  constructor(private _service: OltService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<OLT> {
    const id = parseInt(route.queryParamMap.get('oltid') || route.paramMap.get('oltid'), 10);

    if (!id) {
      return of(null);
    }

    return this._service.getByID(id);
  }
}
