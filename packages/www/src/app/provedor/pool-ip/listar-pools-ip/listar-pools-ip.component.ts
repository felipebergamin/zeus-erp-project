import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ReplaySubject, Observable } from 'rxjs';


import { IpPoolService } from '../../../core/services/ip-pool/ip-pool.service';
import { IPPool } from '../../../core/models/IPPool';

@Component({
  selector: 'app-listar-pools-ip',
  templateUrl: './listar-pools-ip.component.html',
  styleUrls: ['./listar-pools-ip.component.scss']
})
export class ListarPoolsIpComponent implements OnInit {
  displayedColumns = [ 'menu', 'nome', 'cidr' ];
  totalItensPaginator = 0;
  pageSizeOptions = [ 5, 15, 25 ];
  private _rs = new ReplaySubject<IPPool[]>(1);

  constructor(
    private poolService: IpPoolService,
  ) { }

  get dataSource(): Observable<IPPool[]> {
    return this._rs.asObservable();
  }

  ngOnInit() {
    this.poolService.listar({ first: 10, offset: 0 })
      .subscribe(res => this._rs.next(res));
  }

  onPaginationChange(event: PageEvent) {
    const first = event.pageSize;
    const offset = event.pageSize * event.pageIndex;

    this.refreshTableData({ first, offset, nopaginate: false });
  }

  private refreshTableData({ first, offset, nopaginate }: { first: number, offset: number, nopaginate: boolean }) {
    this.poolService.listar({ first, offset, nopaginate })
      .subscribe(res => this._rs.next(res));
  }

}
