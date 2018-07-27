import { Component, OnInit } from '@angular/core';
import { BoletoService } from '../../../core/services/boleto/boleto.service';
import { ReplaySubject } from 'rxjs';
import { Boleto } from '../../../core/models/Boleto';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-listar-boletos',
  templateUrl: './listar-boletos.component.html',
  styleUrls: ['./listar-boletos.component.scss']
})
export class ListarBoletosComponent implements OnInit {
  displayedColumns = ['menu', 'numero', 'nomeCliente', 'valorCobrado', 'valorPago', 'vencimento'];
  totalItensPaginator = 0;
  pageSizeOptions = [50, 75, 100, 150];
  private _rs = new ReplaySubject<Boleto[]>(1);

  constructor(
    private boletoService: BoletoService
  ) { }

  get dataSource() {
    return this._rs.asObservable();
  }

  ngOnInit() {
    const first = this.pageSizeOptions[0];
    this.refreshTableData({ first, offset: 0 });
  }

  onPaginationChange(event: PageEvent) {
    const first = event.pageSize;
    const offset = event.pageSize * event.pageIndex;

    this.refreshTableData({ first, offset });
  }

  private refreshTableData(page: { first: number, offset: number }) {
    this.boletoService.listarBoletos(page)
      .subscribe(
        res => {
          this._rs.next(res.listarBoletos);
          this.totalItensPaginator = res.totalBoletos;
        }
      );
  }

}
