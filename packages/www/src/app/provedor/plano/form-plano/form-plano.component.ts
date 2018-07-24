import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PlanoService } from '../../../core/services/plano/plano.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-plano',
  templateUrl: './form-plano.component.html',
  styleUrls: ['./form-plano.component.scss']
})
export class FormPlanoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private planoService: PlanoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      descricao: [null],
      nome: [null, Validators.required],
      valorMensal: [null, Validators.required],
      velocidadeDownload: [null, Validators.required],
      velocidadeUpload: [null, Validators.required],
    });
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('Formulário inválido! Verifique os dados digitados');
    }

    this.planoService.create(this.form.value)
      .subscribe(
        created => {
          this.snackbar.open(`Plano criado com sucesso (${created._id})`, 'Ok', { duration: 3000 });
          this.router.navigate(['/', 'provedor', 'planos']);
        }
      );
  }

}
