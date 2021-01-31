import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ContaBancariaService } from '../../../core/services/conta-bancaria/conta-bancaria.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-conta-bancaria',
  templateUrl: './form-conta-bancaria.component.html',
  styleUrls: ['./form-conta-bancaria.component.scss']
})
export class FormContaBancariaComponent implements OnInit {
  form: FormGroup;
  formFunction: 'create' | 'update' = 'create';

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private contaBancariaService: ContaBancariaService,
    private route: ActivatedRoute,
    private location: Location,
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

    this.route.data.subscribe(
      ({ contabancaria }) => {
        if (contabancaria) {
          this.formFunction = 'update';

          this.form.addControl('version', new FormControl(null, Validators.required));
          this.form.addControl('_id', new FormControl(null, Validators.required));

          this.form.patchValue(contabancaria);
        }
      }
    );
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('O formulário é inválido! Verifique os dados digitados!', 'Ok', { duration: 5000 });
    }

    if (this.formFunction === 'create') {
      this.contaBancariaService.create(this.form.value)
        .subscribe(
          created => {
            this.snackbar.open(`Conta criada! (${created._id})`);
            this.location.back();
          }
        );
    } else {
      const { _id, ...input } = this.form.value;

      this.contaBancariaService.update(_id, input)
        .subscribe(
          response => {
            this.snackbar.open('Dados alterados!', 'Ok', { duration: 4000 });
            this.location.back();
          }
        );
    }

  }

}
