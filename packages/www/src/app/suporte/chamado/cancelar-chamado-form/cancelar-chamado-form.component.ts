import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ChamadoService } from '../../../core/services/chamado/chamado.service';

@Component({
  selector: 'app-cancelar-chamado-form',
  templateUrl: './cancelar-chamado-form.component.html',
  styleUrls: ['./cancelar-chamado-form.component.scss']
})
export class CancelarChamadoFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public chamado,
    private chamadoService: ChamadoService,
    private dialogRef: MatDialogRef<CancelarChamadoFormComponent>,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      motivoCancelamento: new FormControl(null, Validators.required),
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.chamadoService.cancelar(this.chamado._id, this.form.value)
        .subscribe(
          response => {
            this.dialogRef.close(response);
          }
        );
    }
  }

}
