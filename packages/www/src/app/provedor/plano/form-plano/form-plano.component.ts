import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PlanoService } from '../../../core/services/plano/plano.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-plano',
  templateUrl: './form-plano.component.html',
  styleUrls: ['./form-plano.component.scss']
})
export class FormPlanoComponent implements OnInit {
  form: FormGroup;
  formFunction: 'create' | 'update' = 'create';

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private planoService: PlanoService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      descricao: [null],
      nome: [null, Validators.required],
      valorMensal: [null, Validators.required],
      velocidadeDownload: [null, Validators.required],
      velocidadeUpload: [null, Validators.required],
    });

    this.route.data.subscribe(
      ({ plano }) => {
        if (plano) {
          this.formFunction = 'update';
          this.form.addControl('id', new FormControl(plano._id, Validators.required));
          this.form.patchValue(plano);
        }
      },
    );
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('Formulário inválido! Verifique os dados digitados');
    }

    if (this.formFunction === 'create') {
      this.planoService.create(this.form.value)
        .subscribe(
          created => {
            this.snackbar.open(`Plano criado com sucesso (${created._id})`, 'Ok', { duration: 3000 });
            this.location.back();
          }
        );
    } else {
      const { id, ...input } = this.form.value;

      this.planoService.update(id, input)
        .subscribe(
          () => {
            this.snackbar.open(`Dados atualizados com sucesso!`, 'Ok', { duration: 3000 });
            this.location.back();
          }
        );
    }
  }

}
