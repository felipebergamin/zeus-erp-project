import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ContaBancariaService } from '../../../core/services/conta-bancaria/conta-bancaria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-conta-bancaria',
  templateUrl: './form-conta-bancaria.component.html',
  styleUrls: ['./form-conta-bancaria.component.scss']
})
export class FormContaBancariaComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private contaBancariaService: ContaBancariaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      digitoAgencia: [null, Validators.required],
      numeroAgencia: [null, Validators.required],
      carteira: [null, Validators.required],
      cedente: [null, Validators.required],
      codigoCedente: [null, Validators.required],
      digitoConta: [null, Validators.required],
      numeroConta: [null, Validators.required],
      multaDia: [null, Validators.required],
      multaVencimento: [null, Validators.required],
      nome: [null, Validators.required],
      nossoNumero: [null, Validators.required],
      proximaRemessa: [null, Validators.required],
    });
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('O formulário é inválido! Verifique os dados digitados!', 'Ok', { duration: 5000 });
    }

    this.contaBancariaService.create(this.form.value)
      .subscribe(
        created => {
          this.snackbar.open(`Conta criada! (${created._id})`);
          this.router.navigate(['/', 'financeiro', 'contasbancarias']);
        }
      );

  }

}
