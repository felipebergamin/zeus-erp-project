import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PerfilUsuario } from '../../../core/models/PerfilUsuario';
import { PerfilUsuarioService } from '../../../core/services/perfil-usuario/perfil-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ListaPerfisUsuarioResolver implements Resolve<PerfilUsuario[]> {

  constructor(
    private service: PerfilUsuarioService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PerfilUsuario[]> {
    return this.service.listar({nopaginate: true})
      .pipe(map(res => res.listarPerfisUsuario));
  }
}
