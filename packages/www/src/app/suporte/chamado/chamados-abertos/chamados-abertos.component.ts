import { Component, OnInit } from '@angular/core';
import { PageEvent, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Chamado } from '../../../core/models/Chamado';
import { ChamadoService } from '../../../core/services/chamado/chamado.service';

@Component({
  selector: 'app-chamados-abertos',
  templateUrl: './chamados-abertos.component.html',
  styleUrls: ['./chamados-abertos.component.scss']
})
export class ChamadosAbertosComponent implements OnInit {
  displayedColumns = ['menu', 'protocolo', 'paLogin', 'abertoPor', 'abertoEm', 'motivoAbertura', 'prioridade'];
  totalItensPaginator = 0;
  pageSizeOptions = [10, 25, 50];
  lastPageEvent: PageEvent;
  dataSource = new Subject<Chamado[]>();

  constructor(
    private chamadoService: ChamadoService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    const first = this.totalItensPaginator[0];
    this.refreshTable({ first });
  }

  onPaginationChange(event: PageEvent) {
    this.lastPageEvent = event;

    const first = event.pageSize;
    const offset = event.pageSize * event.pageIndex;

    this.refreshTable({ first, offset });
  }

  refreshTable({ first, offset }: { first?: number, offset?: number} = {}) {
    first = first || (this.lastPageEvent ? this.lastPageEvent.pageSize : this.pageSizeOptions[0]);
    offset = offset || (this.lastPageEvent ? this.lastPageEvent.pageSize * this.lastPageEvent.pageIndex : 0);

    this.chamadoService.chamadosAbertos({ first, offset })
      .pipe(
        tap(res => this.totalItensPaginator = res.totalChamadosAbertos),
        map(res => res.listarChamadosAbertos),
      ).subscribe(this.dataSource);
  }

  chamadoCancelado(chamado: Chamado) {
    this.snackbar.open('Chamado cancelado', 'Ok', { duration: 4000 });
    this.refreshTable();
  }

}
