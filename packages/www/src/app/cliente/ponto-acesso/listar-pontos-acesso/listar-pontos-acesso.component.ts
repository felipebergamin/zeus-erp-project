import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { PontoAcessoService } from '../../../core/services/ponto-acesso/ponto-acesso.service';
import { PontoAcesso } from '../../../core/models/PontoAcesso';
import { PageEvent, MatBottomSheet } from '@angular/material';
import { PontoAcessoActionSheetComponent } from '../ponto-acesso-action-sheet/ponto-acesso-action-sheet.component';
import { swapComponentsWithFade } from '../../../animations';

@Component({
  selector: 'app-listar-pontos-acesso',
  templateUrl: './listar-pontos-acesso.component.html',
  styleUrls: ['./listar-pontos-acesso.component.scss'],

  animations: [
    swapComponentsWithFade,
  ]
})
export class ListarPontosAcessoComponent implements OnInit {
  displayedColumns: string[] = ['menu', 'login', 'nomeCliente', 'nomePlano'];
  pageSizeOptions = [25, 50, 75, 100];
  totalItensPaginator: number;
  lastPageEvent: PageEvent;

  listState: 'in' | 'out' = 'in';
  searchState: 'in' | 'out' = 'out';
  shouldSearchPageRender = false;
  searching = false;

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
    this.lastPageEvent = event;
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

  toggleUiState() {
    this.listState = this.listState === 'out' ? 'in' : 'out';
    this.searchState = this.searchState === 'out' ? 'in' : 'out';
  }

  openSearchDialog() {
    this.shouldSearchPageRender = true;
    this.toggleUiState();
  }

  onCancelSearch() {
    this.toggleUiState();
  }

  doSearch(searchQuery) {
    console.log(searchQuery);
    this.toggleUiState();
    this.paService.buscar(searchQuery)
      .subscribe(
        response => {
          this.searching = true;
          this._dataSource.next(response);
          this.totalItensPaginator = response.length;
        }
      );
  }

  clearSearch() {
    const first = this.lastPageEvent ? this.lastPageEvent.pageSize : this.pageSizeOptions[0];
    const offset = this.lastPageEvent ? this.lastPageEvent.pageSize * this.lastPageEvent.pageIndex : 0;

    this.refreshList({ first, offset });
    this.searching = false;
  }

}
