import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { PerfilUsuario } from '../../../core/models/PerfilUsuario';
import { PerfilUsuarioService } from '../../../core/services/perfil-usuario/perfil-usuario.service';

@Component({
  selector: 'app-listar-perfis-usuario',
  templateUrl: './listar-perfis-usuario.component.html',
  styleUrls: ['./listar-perfis-usuario.component.scss']
})
export class ListarPerfisUsuarioComponent implements OnInit, OnDestroy {
  dataSource = new BehaviorSubject<PerfilUsuario[]>([]);
  displayedColumns = ['menu', 'id', 'nome', 'criadoEm'];
  totalItensPaginator = 0;
  pageSizeOptions = [10, 25, 50];

  constructor(
    private perfilService: PerfilUsuarioService,
  ) { }

  ngOnInit() {
    const first = this.pageSizeOptions[0];
    this.refreshTable({ first, offset: 0 });
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
    this.perfilService.listar({ first, offset })
      .pipe(
        tap(res => this.totalItensPaginator = res.totalPerfisUsuario),
        map(res => res.listarPerfisUsuario)
      ).subscribe(this.dataSource);
  }

}
