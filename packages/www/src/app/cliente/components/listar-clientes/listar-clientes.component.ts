import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { Cliente } from '../../../core/models/Cliente';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class ListarClientesComponent implements OnInit {
  /* paginator */
  displayedColumns: string[] = ['nome', 'cidade'];
  pageSizeOptions = [25, 50, 75, 100];
  totalItensPaginator = 0;
  pageEvent: PageEvent;

  /* data table */
  _dataSource = new ReplaySubject<Cliente[]>(1);

  constructor(
    private clienteService: ClienteService
  ) { }

  get dataSource() {
    return this._dataSource.asObservable();
  }

  ngOnInit() {
    this.clienteService.simpleList({ first: 25, offset: 0, excluded: false })
      .subscribe(
        (res => {
          console.log(res);
          this._dataSource.next(res.listCustomers);
          this.totalItensPaginator = res.totalCustomers;
        })
      );
  }

  onPaginationChange(event: PageEvent) {
    this.clienteService.simpleList({ first: event.pageSize, offset: event.pageIndex, excluded: false })
      .subscribe(res => {
        this._dataSource.next(res.listCustomers);
        this.totalItensPaginator = res.totalCustomers;
      });
  }

}
