import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatBottomSheet, MatDialog, MatPaginator } from '@angular/material';
import { ReplaySubject } from 'rxjs';

import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Cliente } from '../../../core/models/Cliente';
import { ClienteActionSheetComponent } from '../cliente-action-sheet/cliente-action-sheet.component';
import { FormPesquisaClienteComponent } from '../form-pesquisa-cliente/form-pesquisa-cliente.component';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class ListarClientesComponent implements OnInit {
  /* paginator */
  displayedColumns: string[] = ['menu', 'nome', 'cidade'];
  pageSizeOptions = [25, 50, 75, 100];
  totalItensPaginator = 0;
  pageEvent: PageEvent;
  searching = false;
  searchTerms: any;

  /* data table */
  _dataSource = new ReplaySubject<Cliente[]>(1);

  constructor(
    private bottomSheet: MatBottomSheet,
    private clienteService: ClienteService,
    private dialog: MatDialog,
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
    this.dialog.open(FormPesquisaClienteComponent, {
      data: { previousSearchValues: this.searchTerms }
    })
      .afterClosed()
      .subscribe(data => {
        if (!data) {
          return;
        }

        this.searchTerms = data;

        this.clienteService.search(data)
          .subscribe(result => {
            this.searching = true;
            this.totalItensPaginator = result.length;
            this._dataSource.next(result);
          });
      });
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

}
