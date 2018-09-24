import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog } from '@angular/material';

import { Chamado } from '../../../core/models/Chamado';
import { ChamadoService } from '../../../core/services/chamado/chamado.service';
import { CancelarChamadoFormComponent } from '../cancelar-chamado-form/cancelar-chamado-form.component';

@Component({
  selector: 'app-chamado-action-sheet',
  templateUrl: './chamado-action-sheet.component.html',
  styleUrls: ['./chamado-action-sheet.component.scss']
})
export class ChamadoActionSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private chamado: Chamado,
    private _service: ChamadoService,
    private sheet: MatBottomSheetRef<ChamadoActionSheetComponent>,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  print() {
    this._service.getPrintURL(this.chamado)
      .subscribe(
        url => window.open(url, 'download_remessa', 'location=no').print(),
        null,
        () => this.sheet.dismiss(),
      );
  }

  cancelar() {
    this.dialog.open(CancelarChamadoFormComponent, { data: this.chamado });
  }

}
