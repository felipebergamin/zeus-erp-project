import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { OltService } from '../../../core/services/olt/olt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-olt',
  templateUrl: './form-olt.component.html',
  styleUrls: ['./form-olt.component.scss']
})
export class FormOltComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private oltService: OltService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      ip: [ null, Validators.required ],
      nome: [ null, Validators.required ],
      obs: [ null ],
    });
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('O formulário é inválido! Verifique os dados digitados', 'Ok');
    }

    this.oltService.create(this.form.value)
      .subscribe(
        (created) => {
          this.snackbar.open(`OLT ${created._id} - ${created.nome} criada!`, 'Ok', { duration: 2000 });
          this.router.navigate(['/', 'provedor', 'olts']);
        }
      );
  }

}
