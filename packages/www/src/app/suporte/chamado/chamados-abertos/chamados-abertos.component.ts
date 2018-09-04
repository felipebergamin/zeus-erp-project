import { Component, OnInit } from '@angular/core';
import { PageEvent, MatBottomSheet } from '@angular/material';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Chamado } from '../../../core/models/Chamado';
import { ChamadoService } from '../../../core/services/chamado/chamado.service';
import { ChamadoActionSheetComponent } from '../chamado-action-sheet/chamado-action-sheet.component';

@Component({
  selector: 'app-chamados-abertos',
  templateUrl: './chamados-abertos.component.html',
  styleUrls: ['./chamados-abertos.component.scss']
})
export class ChamadosAbertosComponent implements OnInit {
  displayedColumns = ['menu', 'protocolo', 'paLogin', 'abertoPor', 'abertoEm', 'motivoAbertura', 'prioridade'];
  totalItensPaginator = 0;
  pageSizeOptions = [10, 25, 50];
  dataSource = new Subject<Chamado[]>();

  constructor(
    private chamadoService: ChamadoService,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
    const first = this.totalItensPaginator[0];
    this.refreshTable({ first });
  }

  onPaginationChange(event: PageEvent) {
    const first = event.pageSize;
    const offset = event.pageSize * event.pageIndex;

    this.refreshTable({ first, offset });
  }

  refreshTable({first = 10, offset = 0} = {}) {
    this.chamadoService.chamadosAbertos({ first, offset })
      .pipe(
        tap(res => this.totalItensPaginator = res.totalChamadosAbertos),
        map(res => res.listarChamadosAbertos),
      ).subscribe(this.dataSource);
  }

  showActionSheet(chamado: Chamado) {
    this.bottomSheet.open(ChamadoActionSheetComponent, { data: chamado });
  }

}
