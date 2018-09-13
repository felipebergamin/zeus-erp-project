import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog } from '@angular/material';

import { PontoAcesso } from '../../../core/models/PontoAcesso';
import { ExibirSinalOnuComponent } from '../exibir-sinal-onu/exibir-sinal-onu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ponto-acesso-action-sheet',
  templateUrl: './ponto-acesso-action-sheet.component.html',
  styleUrls: ['./ponto-acesso-action-sheet.component.scss']
})
export class PontoAcessoActionSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public pa: PontoAcesso,
    private sheetRef: MatBottomSheetRef<PontoAcessoActionSheetComponent>,
    private matDialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  consultarSinalONU() {
    if (!this.pa) {
      return;
    }

    this.sheetRef.dismiss();
    this.matDialog.open(ExibirSinalOnuComponent, {
      data: this.pa
    });
  }

  abrirInstalacao() {
    this.sheetRef.dismiss();
    this.router.navigate(['/suporte/instalacao/abrir'], {queryParams: {idpontoacesso: this.pa._id}});
  }

  edit() {
    this.sheetRef.dismiss();
    this.router.navigate(['/cliente/pa/edit', this.pa._id]);
  }

}
