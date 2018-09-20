import { Component, OnInit } from '@angular/core';
import { PageEvent, MatBottomSheet } from '@angular/material';
import { ReplaySubject } from 'rxjs';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Cliente } from '../../../core/models/Cliente';
import { ClienteActionSheetComponent } from '../cliente-action-sheet/cliente-action-sheet.component';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss'],

  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0, display: 'none' })),
      transition('in => out', [
        animate('100ms ease-out', style({ opacity: 0 })),
      ]),
      transition('out => in', [
        animate('100ms 100ms ease-in', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class ListarClientesComponent implements OnInit {
  /* paginator */
  displayedColumns: string[] = ['menu', 'nome', 'cidade'];
  pageSizeOptions = [25, 50, 75, 100];
  totalItensPaginator = 0;
  pageEvent: PageEvent;
  searching = false;
  searchTerms: any;

  listState: 'in' | 'out' = 'in';
  searchState: 'in' | 'out' = 'out';

  /* data table */
  _dataSource = new ReplaySubject<Cliente[]>(1);

  constructor(
    private bottomSheet: MatBottomSheet,
    private clienteService: ClienteService,
  ) { }

  get dataSource() {
    return this._dataSource.asObservable();
  }

  ngOnInit() {
    this.loadTableData();
  }

  loadTableData({ first, offset }: { first?: number, offset?: number } = {}) {
    first = first || this.pageSizeOptions[0];
    offset = offset || 0;

    this.clienteService.simpleList({ first, offset, excluded: false })
      .subscribe(
        res => {
          this.totalItensPaginator = res.totalCustomers;
          this._dataSource.next(res.listCustomers);
        }
      );
  }

  onPaginationChange(event: PageEvent) {
    this.pageEvent = event;

    const first = event.pageSize;
    const offset = event.pageIndex * event.pageSize;

    this.loadTableData({ first, offset });
  }

  openBottomSheet(cli: Cliente) {
    this.bottomSheet.open(ClienteActionSheetComponent, {
      data: cli
    });
  }

  openSearchDialog() {
    this.toggleUiState();
  }

  clearSearch() {
    this.searching = this.searchTerms = false;
    const first = this.pageEvent ? this.pageEvent.pageSize : null;
    const offset = this.pageEvent ? this.pageEvent.pageIndex * this.pageEvent.pageSize : null;

    this.loadTableData({ first, offset });
  }

  /** function called on refresh button `click` event */
  refreshTable() {
    if (this.searching) {
      this.clienteService.search(this.searchTerms)
        .subscribe(result => {
          this.searching = true;
          this.totalItensPaginator = result.length;
          this._dataSource.next(result);
        });
    } else {
      this.loadTableData({
        first: (this.pageEvent ? this.pageEvent.pageSize : null),
        offset: (this.pageEvent ? this.pageEvent.pageSize * this.pageEvent.pageIndex : null),
      });
    }
  }

  onDoSearch(searchQuery) {
    this.toggleUiState();

    this.clienteService.search(searchQuery)
      .subscribe(result => {
        this.searching = true;
        this.totalItensPaginator = result.length;
        this._dataSource.next(result);
      });
  }

  onCancelSearch() {
    this.toggleUiState();
  }

  toggleUiState() {
    this.listState = this.listState === 'in' ? 'out' : 'in';
    this.searchState = this.searchState === 'in' ? 'out' : 'in';
  }

}
