import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { PontoAcessoService } from '../../../core/services/ponto-acesso/ponto-acesso.service';
import { PontoAcesso } from '../../../core/models/PontoAcesso';
import { PageEvent, MatBottomSheet } from '@angular/material';
import { PontoAcessoActionSheetComponent } from '../ponto-acesso-action-sheet/ponto-acesso-action-sheet.component';

@Component({
  selector: 'app-listar-pontos-acesso',
  templateUrl: './listar-pontos-acesso.component.html',
  styleUrls: ['./listar-pontos-acesso.component.scss']
})
export class ListarPontosAcessoComponent implements OnInit {
  displayedColumns: string[] = ['menu', 'login', 'nomeCliente', 'nomePlano'];
  pageSizeOptions = [25, 50, 75, 100];
  totalItensPaginator: number;

  _dataSource = new ReplaySubject<PontoAcesso[]>(1);

  constructor(
    private paService: PontoAcessoService,
    private bottomSheet: MatBottomSheet,
  ) { }

  get dataSource() {
    return this._dataSource.asObservable();
  }

  ngOnInit() {
    this.refreshList({ first: 25, offset: 0 });
  }

  onPaginationChange(event: PageEvent) {
    this.refreshList({ first: event.pageSize, offset: event.pageIndex * event.pageSize });
  }

  refreshList({ first, offset }: { first: number, offset: number }) {
    this.paService.list({ first, offset })
      .subscribe(res => {
        this._dataSource.next(res.listarPontosDeAcesso);
        this.totalItensPaginator = res.totalPontosDeAcesso;
      });
  }

  openBottomSheet(pa: PontoAcesso) {
    this.bottomSheet.open(PontoAcessoActionSheetComponent, {
      data: pa
    });
  }

}
