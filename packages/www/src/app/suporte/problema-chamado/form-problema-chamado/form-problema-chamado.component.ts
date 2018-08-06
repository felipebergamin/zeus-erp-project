import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { ProblemaChamadoService } from '../../../core/services/problema-chamado/problema-chamado.service';

@Component({
  selector: 'app-form-problema-chamado',
  templateUrl: './form-problema-chamado.component.html',
  styleUrls: ['./form-problema-chamado.component.scss']
})
export class FormProblemaChamadoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _service: ProblemaChamadoService,
    private snackbar: MatSnackBar,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      descricao: [null, Validators.required],
      geraCobranca: [null, Validators.required],
      valorCobrado: [null],
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      this._service.create(this.form.value)
       .subscribe(
         created => {
          this.snackbar.open(`Criado com sucesso! ${created._id}`, 'Ok', { duration: 4000 });
          this.location.back();
         }
       );
    } else {
      this.snackbar.open('Por favor, verifique os dados digitados', 'Ok');
    }
  }

}
