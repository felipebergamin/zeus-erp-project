import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PageEvent } from '@angular/material';

import { ArquivoRetorno } from '../../../core/models/ArquivoRetorno';
import { RetornoService } from '../../../core/services/retorno/retorno.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-listar-retorno',
  templateUrl: './listar-retorno.component.html',
  styleUrls: ['./listar-retorno.component.scss']
})
export class ListarRetornoComponent implements OnInit {
  dataSource = new Subject<ArquivoRetorno[]>();
  displayedColumns = [
    'menu',
    'id',
    'contaBancaria',
    'nomeArquivo',
    'qtdeOperacoes',
    'dataGravacao',
  ];
  totalItensPaginator = 0;
  pageSizeOptions = [10, 25, 50];

  constructor(private retorno: RetornoService) { }

  ngOnInit() {
    const first = this.pageSizeOptions[0];
    const offset = 0;

    this.refreshTable(first, offset);
  }

  onPaginationChange(event: PageEvent) {
    const first = event.pageSize;
    const offset = event.pageSize * event.pageIndex;

    this.refreshTable(first, offset);
  }

  refreshTable(first?: number, offset?: number) {
    this.retorno.listarRetornos({ first, offset })
      .pipe(
        tap(res => this.totalItensPaginator = res.totalArquivosRetorno),
        map(res => res.listarArquivosRetorno)
      ).subscribe(data => this.dataSource.next(data));
  }
}
