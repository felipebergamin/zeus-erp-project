import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProblemaChamadoService } from '../../../core/services/problema-chamado/problema-chamado.service';
import { ProblemaChamado } from '../../../core/models/ProblemaChamado';

@Component({
  selector: 'app-listar-problemas-chamado',
  templateUrl: './listar-problemas-chamado.component.html',
  styleUrls: ['./listar-problemas-chamado.component.scss']
})
export class ListarProblemasChamadoComponent implements OnInit {
  displayedColumns = ['menu', 'id', 'descricao', 'geraCobranca', 'valorCobrado', 'criadoEm'];
  totalItensPaginator = 0;
  pageSizeOptions = [10, 25, 75];

  dataSource = new BehaviorSubject<ProblemaChamado[]>([]);

  constructor(
    private _service: ProblemaChamadoService,
  ) { }

  ngOnInit() {
    const first = this.pageSizeOptions[0];

    this.refreshTable({ first, offset: 0 });
  }

  onPaginationChange(event: PageEvent) {
    const first = event.pageSize;
    const offset = event.pageSize * event.pageIndex;

    this.refreshTable({ first, offset });
  }

  refreshTable({ first, offset }: { first: number, offset: number }) {
    this._service.listar({ first, offset })
      .pipe(map(res => res.listarProblemasChamado))
      .subscribe(this.dataSource);
  }

}
