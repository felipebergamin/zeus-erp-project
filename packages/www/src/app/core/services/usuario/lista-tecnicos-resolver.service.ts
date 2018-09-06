import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../../models/Usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ListaTecnicosResolver implements Resolve<Usuario[]> {

  constructor(private _service: UsuarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario[]> {
    return this._service.buscar({ tipo: 'tecnico' });
  }
}
