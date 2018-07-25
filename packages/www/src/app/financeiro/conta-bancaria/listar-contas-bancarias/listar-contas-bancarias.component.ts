import { Component, OnInit } from '@angular/core';
import { ContaBancariaService } from '../../../core/services/conta-bancaria/conta-bancaria.service';
import { ReplaySubject, Observable } from 'rxjs';
import { ContaBancaria } from '../../../core/models/ContaBancaria';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-listar-contas-bancarias',
  templateUrl: './listar-contas-bancarias.component.html',
  styleUrls: ['./listar-contas-bancarias.component.scss']
})
export class ListarContasBancariasComponent implements OnInit {
  displayedColumns = ['menu', 'nome', 'criadaEm'];
  totalItensPaginator = 0;
  pageSizeOptions = [5, 10];
  private _rs = new ReplaySubject<ContaBancaria[]>(1);

  constructor(
    private contaBancariaService: ContaBancariaService,
  ) { }

  get dataSource(): Observable<ContaBancaria[]> {
    return this._rs.asObservable();
  }

  ngOnInit() {
    const first = this.pageSizeOptions[0];
    this.refreshTable({ first, offset: 0 });
  }

  onPaginationChange(event: PageEvent) {
    const first = event.pageSize;
    const offset = event.pageSize * event.pageIndex;

    this.refreshTable({ first, offset });
  }

  refreshTable({ first = 10, offset = 0, nopaginate = false }) {
    this.contaBancariaService.list({ first, offset, nopaginate })
      .subscribe(res => {
        this.totalItensPaginator = res.totalBankAccounts;
        this._rs.next(res.listBankAccounts);
      });
  }

}
