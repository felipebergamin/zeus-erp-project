import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPPool } from '../../models/IPPool';
import { IpPoolService } from '../../services/ip-pool/ip-pool.service';

@Injectable({
  providedIn: 'root'
})
export class ListaIpPoolResolver implements Resolve<IPPool[]> {

  constructor(private _service: IpPoolService) { }

  resolve(): Observable<IPPool[]> {
    return this._service.listar({ nopaginate: true })
      .pipe(map(res => res.listarIPPools));
  }
}
