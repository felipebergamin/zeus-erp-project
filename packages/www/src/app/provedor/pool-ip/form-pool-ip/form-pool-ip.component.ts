import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { IpPoolService } from '../../../core/services/ip-pool/ip-pool.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-pool-ip',
  templateUrl: './form-pool-ip.component.html',
  styleUrls: ['./form-pool-ip.component.scss']
})
export class FormPoolIpComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private poolService: IpPoolService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [null, Validators.required],
      cidr: [null, Validators.required],
    });
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('Formulário inválido! Verifique os dados digitados');
    }

    this.poolService.create(this.form.value)
      .subscribe(
        (created) => {
          this.snackbar.open(`Pool criado! (${created._id})`);
          this.router.navigate(['/provedor/pools']);
        }
      );
  }

}
