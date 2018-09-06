import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MikrotikRouterService } from '../../../core/services/mikrotik-router/mikrotik-router.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { isValidIPAddress } from '../../../form-validators/isIP';

@Component({
  selector: 'app-mikrotik-router-form',
  templateUrl: './mikrotik-router-form.component.html',
  styleUrls: ['./mikrotik-router-form.component.scss']
})
export class MikrotikRouterFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private mkrouterService: MikrotikRouterService,
    private snackbar: MatSnackBar,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      ipAddress: new FormControl(null, [Validators.required, isValidIPAddress]),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      apiPort: new FormControl(null, [Validators.min(1), Validators.max(65535)]),
      systemName: new FormControl(null, Validators.required),
      radiusSecret: new FormControl(null, Validators.required),
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.mkrouterService.createRouter(this.form.value)
        .subscribe(created => {
          this.snackbar.open(`Roteador com ID ${created.id} criado!`, 'Ok', { duration: 4000 });
          this.location.back();
        });
    } else {
      this.snackbar.open('Ops, parece que o formulário é inválido! Verifique os dados digitados', 'Ok');
    }
  }

}
