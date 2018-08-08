import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog } from '@angular/material';

import { PontoAcesso } from '../../../core/models/PontoAcesso';
import { FiberhomeService } from '../../../core/services/fiberhome/fiberhome.service';
import { ExibirSinalOnuComponent } from '../exibir-sinal-onu/exibir-sinal-onu.component';

@Component({
  selector: 'app-ponto-acesso-action-sheet',
  templateUrl: './ponto-acesso-action-sheet.component.html',
  styleUrls: ['./ponto-acesso-action-sheet.component.scss']
})
export class PontoAcessoActionSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public pa: PontoAcesso,
    private sheetRef: MatBottomSheetRef<PontoAcessoActionSheetComponent>,
    private fiberhome: FiberhomeService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  consultarSinalONU() {
    if (!this.pa) {
      return;
    }

    this.fiberhome.consultarSinalPA(this.pa._id)
      .subscribe(
        sinal => {
          this.sheetRef.dismiss();
          this.matDialog.open(ExibirSinalOnuComponent, {
            data: {
              sinal,
              pa: this.pa,
            }
          });
        }
      );
  }

}
