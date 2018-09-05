import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { MikrotikRouter } from '../../../core/models/MikrotikRouter';
import { MikrotikRouterService } from '../../../core/services/mikrotik-router/mikrotik-router.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-mikrotik-routers-list',
  templateUrl: './mikrotik-routers-list.component.html',
  styleUrls: ['./mikrotik-routers-list.component.scss']
})
export class MikrotikRoutersListComponent implements OnInit, OnDestroy {
  displayedColumns = ['menu', 'systemName', 'ipAddress', 'createdAt'];
  totalItensPaginator = 0;
  pageSizeOptions = [10, 25, 50];

  dataSource = new Subject<MikrotikRouter[]>();

  constructor(private mkRouterService: MikrotikRouterService) { }

  ngOnInit() {
    this.refreshTable(this.pageSizeOptions[0]);
  }

  ngOnDestroy() {
    this.dataSource.complete();
  }

  onPaginationChange(event: PageEvent) {
    this.refreshTable(event.pageSize, event.pageSize * event.pageIndex);
  }

  private refreshTable(first: number = 10, offset: number = 0) {
    this.mkRouterService.mikrotikRoutersList({ first, offset })
      .pipe(
        tap(res => this.totalItensPaginator = res.mikrotikRoutersCount),
        map(res => res.mikrotikRoutersList),
      ).subscribe(routers => this.dataSource.next(routers));
  }

}
