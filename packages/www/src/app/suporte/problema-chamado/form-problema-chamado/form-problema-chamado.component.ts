import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { ProblemaChamadoService } from '../../../core/services/problema-chamado/problema-chamado.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-problema-chamado',
  templateUrl: './form-problema-chamado.component.html',
  styleUrls: ['./form-problema-chamado.component.scss']
})
export class FormProblemaChamadoComponent implements OnInit {
  form: FormGroup;
  formFunction: 'create' | 'update' = 'create';

  constructor(
    private fb: FormBuilder,
    private _service: ProblemaChamadoService,
    private snackbar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      descricao: [null, Validators.required],
      geraCobranca: [null, Validators.required],
      valorCobrado: [null],
    });

    this.route.data.subscribe(
      ({ problemaChamado }) => {
        if (problemaChamado) {
          this.formFunction = 'update';

          this.form.addControl('id', new FormControl(problemaChamado._id, Validators.required));
          this.form.patchValue(problemaChamado);
        }
      }
    );
  }

  onFormSubmit() {
    if (this.form.valid) {
      if (this.formFunction === 'create') {
        this._service.create(this.form.value)
          .subscribe(
            created => {
              this.snackbar.open(`Criado com sucesso! ${created._id}`, 'Ok', { duration: 4000 });
              this.location.back();
            }
          );
      } else if (this.formFunction === 'update') {
        const { id, ...input } = this.form.value;

        this._service.update(id, input)
          .subscribe(
            response => {
              this.snackbar.open(`Dados atualizados!`, 'Ok', { duration: 4000 });
              this.location.back();
            }
          );
      }

    } else {
      this.snackbar.open('Por favor, verifique os dados digitados', 'Ok', { duration: 4000 });
    }
  }

}
