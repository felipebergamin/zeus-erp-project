import { Component, OnInit } from '@angular/core';
import { PageEvent, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Chamado } from '../../../core/models/Chamado';
import { ChamadoService } from '../../../core/services/chamado/chamado.service';
import { swapComponentsWithFade } from '../../../animations';

@Component({
  selector: 'app-listar-chamados',
  templateUrl: './listar-chamados.component.html',
  styleUrls: ['./listar-chamados.component.scss'],
  animations: [
    swapComponentsWithFade,
  ],
})
export class ListarChamadosComponent implements OnInit {
  displayedColumns = ['menu', 'protocolo', 'paLogin', 'abertoPor', 'abertoEm', 'motivoAbertura', 'prioridade'];
  totalItensPaginator = 0;
  pageSizeOptions = [10, 25, 50];
  lastPageEvent: PageEvent;
  dataSource = new Subject<Chamado[]>();

  searchState: 'in' | 'out' = 'out';
  listState: 'in' | 'out' = 'in';

  constructor(
    private chamadoService: ChamadoService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    const first = this.totalItensPaginator[0];
    this.refreshTable({ first });
  }

  showSearchForm() {
    this.toggleUiState();
  }

  onPaginationChange(event: PageEvent) {
    this.lastPageEvent = event;

    const first = event.pageSize;
    const offset = event.pageSize * event.pageIndex;

    this.refreshTable({ first, offset });
  }

  refreshTable({ first, offset }: { first?: number, offset?: number } = {}) {
    first = first || (this.lastPageEvent ? this.lastPageEvent.pageSize : this.pageSizeOptions[0]);
    offset = offset || (this.lastPageEvent ? this.lastPageEvent.pageSize * this.lastPageEvent.pageIndex : 0);

    this.chamadoService.chamadosAbertos({ first, offset })
      .pipe(
        tap(res => this.totalItensPaginator = res.totalChamadosAbertos),
        map(res => res.listarChamadosAbertos),
      ).subscribe(data => this.dataSource.next(data));
  }

  toggleUiState() {
    this.listState = this.listState === 'in' ? 'out' : 'in';
    this.searchState = this.searchState === 'in' ? 'out' : 'in';
  }

  chamadoCancelado(chamado: Chamado) {
    this.snackbar.open('Chamado cancelado', 'Ok', { duration: 4000 });
    this.refreshTable();
  }

  onCancelSearch() {
    this.toggleUiState();
  }

  doSearch(searchValues) {
    this.toggleUiState();
    console.log(searchValues);

    if (Object.keys(searchValues).length > 0) {
      this.chamadoService.buscar(searchValues)
        .subscribe(
          data => this.dataSource.next(data)
        );
    } else {
      this.snackbar.open('Nenhum critério de busca definido, a busca será ignorada', 'Ok', { duration: 6000 });
    }
  }

}
