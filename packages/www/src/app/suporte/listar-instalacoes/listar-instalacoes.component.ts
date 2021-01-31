import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { InstalacaoService } from '../../core/services/instalacao/instalacao.service';
import { Instalacao } from '../../core/models/Instalacao';

@Component({
  selector: 'app-listar-instalacoes',
  templateUrl: './listar-instalacoes.component.html',
  styleUrls: ['./listar-instalacoes.component.scss']
})
export class ListarInstalacoesComponent implements OnInit {
  displayedColumns = ['menu', 'dataAgenda', 'pontoAcesso', 'cidade', 'endereco'];
  totalItensPaginator = 0;
  pageSizeOptions = [10, 25, 50, 75];
  dataSource = new Subject<Instalacao[]>();

  constructor(private instalacao: InstalacaoService) { }

  ngOnInit() {
    this.refreshTable(this.pageSizeOptions[0]);
  }

  onPaginationChange(event: PageEvent) {
    this.refreshTable(
      event.pageSize,
      event.pageSize * event.pageIndex,
    );
  }

  refreshTable(first = 10, offset = 0) {
    this.instalacao.listarInstalacoes({ first, offset })
      .pipe(
        tap(res => this.totalItensPaginator = res.totalInstalacoes),
        map(res => res.listarInstalacoes)
      )
      .subscribe(data => this.dataSource.next(data));
  }

}
