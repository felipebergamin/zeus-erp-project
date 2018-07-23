import { Component, OnInit } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import { OltService } from '../../../core/services/olt/olt.service';
import { OLT } from '../../../core/models/OLT';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-listar-olts',
  templateUrl: './listar-olts.component.html',
  styleUrls: ['./listar-olts.component.scss']
})
export class ListarOltsComponent implements OnInit {
  totalItensPaginator: number;
  displayedColumns = ['menu', 'nome', 'createdAt'];
  pageSizeOptions = [5, 15, 25];
  private _rs = new ReplaySubject<OLT[]>(1);

  constructor(
    private oltService: OltService,
  ) { }

  get dataSource(): Observable<OLT[]> {
    return this._rs.asObservable();
  }

  ngOnInit() {
    this.refreshData({ first: 5, offset: 0, nopaginate: false });
  }

  onPaginationChange(event: PageEvent) {
    this.refreshData({ first: event.pageSize, offset: event.pageIndex * event.pageSize, nopaginate: false });
  }

  private refreshData({ first, offset, nopaginate }) {
    this.oltService.listar({ first, offset, nopaginate })
      .subscribe(res => {
        this._rs.next(res.listarOLTs);
        this.totalItensPaginator = res.totalOlts;
      });
  }

}
