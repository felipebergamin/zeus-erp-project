import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { ArquivoRemessa } from '../../../core/models/ArquivoRemessa';
import { RemessaService } from '../../../core/services/remessa/remessa.service';

@Component({
  selector: 'app-listar-remessas',
  templateUrl: './listar-remessas.component.html',
  styleUrls: ['./listar-remessas.component.scss']
})
export class ListarRemessasComponent implements OnInit {
  displayedColumns = ['menu', 'id', 'contaBancaria', 'nomeArquivo', 'qtdeOperacoes'];
  totalItensPaginator = 0;
  pageSizeOptions = [5, 25, 100];
  dataSource = new Subject<ArquivoRemessa[]>();

  constructor(
    private remessaService: RemessaService,
  ) { }

  ngOnInit() {
    const first = this.pageSizeOptions[0];
    const offset = 0;

    this.refreshTable({ first, offset });
  }

  onPaginationChange(event: PageEvent) {
    const first = event.pageSize;
    const offset = event.pageIndex * event.pageSize;

    this.refreshTable({ first, offset });
  }

  refreshTable(page: { first: number, offset: number }) {
    this.remessaService.listarRemessa(page)
      .pipe(
        tap(res => this.totalItensPaginator = res.totalArquivosRemessa),
        map(res => res.listarArquivosRemessa),
      ).subscribe(data => this.dataSource.next(data));
  }

  downloadRemessa(remessa: ArquivoRemessa) {
    this.remessaService.getDownloadLink(remessa)
      .subscribe(uri => window.open(uri, 'download_remessa', 'location=no'));
  }

}
