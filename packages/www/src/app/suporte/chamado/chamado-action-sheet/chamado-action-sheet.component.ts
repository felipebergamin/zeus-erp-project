import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ChamadoService } from '../../../core/services/chamado/chamado.service';
import { CancelarChamadoFormComponent } from '../cancelar-chamado-form/cancelar-chamado-form.component';
import { Chamado } from '../../../core/models/Chamado';

@Component({
  selector: 'app-chamado-action-sheet',
  templateUrl: './chamado-action-sheet.component.html',
  styleUrls: ['./chamado-action-sheet.component.scss']
})
export class ChamadoActionSheetComponent implements OnInit {
  @Input() chamado: Chamado;

  @Output() chamadoCancelado = new EventEmitter(true);

  constructor(
    private _service: ChamadoService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  print() {
    this._service.getPrintURL(this.chamado)
      .subscribe(
        url => window.open(url, 'download_remessa', 'location=no').print(),
      );
  }

  cancelar() {
    this.dialog.open(CancelarChamadoFormComponent, { data: this.chamado })
      .afterClosed()
      .subscribe(
        result => {
          if (result) {
            this.chamadoCancelado.emit(result);
          }
        }
      );
  }

}
