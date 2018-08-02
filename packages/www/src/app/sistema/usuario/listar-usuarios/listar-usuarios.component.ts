import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Usuario } from '../../../core/models/Usuario';
import { UsuarioService } from '../../../core/services/usuario/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit, OnDestroy {
  displayedColumns = ['menu', 'id', 'nome', 'login', 'perfil', 'criadoEm'];
  pageSizeOptions = [10, 25, 50];
  totalItensPaginator = 0;
  dataSource = new BehaviorSubject<Usuario[]>([]);

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    const first = this.pageSizeOptions[0];
    const offset = 0;
    this.refreshTable({ first, offset });
  }

  ngOnDestroy() {
    this.dataSource.complete();
  }

  onPaginationChange(pageEvent: PageEvent) {
    const first = pageEvent.pageSize;
    const offset = pageEvent.pageSize * pageEvent.pageIndex;
    this.refreshTable({ first, offset });
  }

  refreshTable({ first, offset }: { first: number, offset: number }) {
    this.usuarioService.listar({ first, offset })
      .pipe(
        tap(res => {
          this.totalItensPaginator = res.totalUsers;
        }),
        map(res => res.listUsers)
      )
      .subscribe(this.dataSource);
  }

}
