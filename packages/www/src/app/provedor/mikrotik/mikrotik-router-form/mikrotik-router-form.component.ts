import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MikrotikRouterService } from '../../../core/services/mikrotik-router/mikrotik-router.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

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
      ipAddress: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      apiPort: new FormControl(),
      systemName: new FormControl(),
      radiusSecret: new FormControl(),
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.mkrouterService.createRouter(this.form.value)
        .subscribe(created => {
          console.log(created);
          this.snackbar.open(`Roteador com ID ${created.id} criado!`, 'Ok', { duration: 4000 });
          this.location.back();
        });
    } else {
      this.snackbar.open('Ops, parece que o formulário é inválido! Verifique os dados digitados', 'Ok');
    }
  }

}
