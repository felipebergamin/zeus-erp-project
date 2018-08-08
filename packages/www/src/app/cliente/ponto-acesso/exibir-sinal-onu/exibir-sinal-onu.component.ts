import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SinalOnu } from '../../../core/services/fiberhome/fiberhome.graphql';
import { PontoAcesso } from '../../../core/models/PontoAcesso';
import { FiberhomeService } from '../../../core/services/fiberhome/fiberhome.service';

@Component({
  selector: 'app-exibir-sinal-onu',
  templateUrl: './exibir-sinal-onu.component.html',
  styleUrls: ['./exibir-sinal-onu.component.scss']
})
export class ExibirSinalOnuComponent implements OnInit {
  disableButton = false;
  sinal: SinalOnu;

  constructor(
    @Inject(MAT_DIALOG_DATA) public pa: PontoAcesso,
    private fiberhome: FiberhomeService,
    private dialogRef: MatDialogRef<ExibirSinalOnuComponent>,
  ) { }

  ngOnInit() {
    this.fiberhome.consultarSinalPA(this.pa._id)
      .subscribe(sinal => this.sinal = sinal);
  }

  verificar() {
    this.disableButton = true;
    this.fiberhome.consultarSinalPA(this.pa._id)
      .subscribe(sinal => {
        this.sinal = sinal;
        setTimeout(() => this.disableButton = false, 3000);
      });
  }

  fechar() {
    this.dialogRef.close();
  }

}
