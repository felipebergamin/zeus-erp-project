import { Component, OnInit } from '@angular/core';
import { PlanoService } from '../../../core/services/plano/plano.service';
import { ReplaySubject, Observable } from 'rxjs';
import { Plano } from '../../../core/models/Plano';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-listar-planos',
  templateUrl: './listar-planos.component.html',
  styleUrls: ['./listar-planos.component.scss']
})
export class ListarPlanosComponent implements OnInit {
  displayedColumns = [ 'menu', 'nome', 'valorMensal', 'createdAt' ];
  pageSizeOptions = [ 5, 15, 25, 50 ];
  totalItensPaginator: number;
  private _rs = new ReplaySubject<Plano[]>(1);

  constructor(private planoService: PlanoService) { }

  get dataSource(): Observable<Plano[]> {
    return this._rs.asObservable();
  }

  ngOnInit() {
    const first = this.pageSizeOptions[0];
    this.refreshTable({ first, offset: 0, nopaginate: false });
  }

  onPaginationChange(pageEvent: PageEvent) {
    const { pageSize, pageIndex } = pageEvent;
    this.refreshTable({ first: pageSize, offset: pageSize * pageIndex, nopaginate: false });
  }

  private refreshTable(vars: { first: number, offset: number, nopaginate: boolean }) {
    return this.planoService.listar(vars)
      .subscribe(
        (res) => {
          this._rs.next(res.listarPlanos);
          this.totalItensPaginator = res.totalPlanos;
        }
      );
  }

}
