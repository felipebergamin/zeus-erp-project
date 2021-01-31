import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MikrotikRouterService } from '../../../core/services/mikrotik-router/mikrotik-router.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { isValidIPAddress } from '../../../form-validators/isIP';
import { ActivatedRoute } from '@angular/router';
import { MikrotikRouter } from '../../../core/models/MikrotikRouter';
import { clearFalsyProps } from '../../../utils';

@Component({
  selector: 'app-mikrotik-router-form',
  templateUrl: './mikrotik-router-form.component.html',
  styleUrls: ['./mikrotik-router-form.component.scss']
})
export class MikrotikRouterFormComponent implements OnInit {
  form: FormGroup;
  formFunction: 'create' | 'update' = 'create';

  constructor(
    private mkrouterService: MikrotikRouterService,
    private snackbar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      ipAddress: new FormControl(null, [Validators.required, isValidIPAddress]),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null),
      apiPort: new FormControl(8728, [Validators.required, Validators.min(1), Validators.max(65535)]),
      systemName: new FormControl(null, Validators.required),
      radiusSecret: new FormControl(null, Validators.required),
    });

    this.route.data.subscribe(
      ({ mkrouter }: { mkrouter: MikrotikRouter }) => {
        if (mkrouter) {
          this.formFunction = 'update';

          this.form.addControl('id', new FormControl(mkrouter.id, Validators.required));
          this.form.patchValue(mkrouter);
        } else {
          this.form.get('password').setValidators(Validators.required);
        }
      },
    );
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.snackbar.open('Ops, parece que o formulário é inválido! Verifique os dados digitados', 'Ok');
    }

    if (this.formFunction === 'create') {
      return this.mkrouterService.createRouter(this.form.value)
        .subscribe(created => {
          this.snackbar.open(`Roteador com ID ${created.id} criado!`, 'Ok', { duration: 4000 });
          this.location.back();
        });
    }

    const { id, ...input } = clearFalsyProps(this.form.value);

    console.log(id, input);
    this.mkrouterService.updateRouter(id, input)
      .subscribe(() => {
        this.snackbar.open(`Dados do roteador atualizado!`, null, { duration: 4000 });
        this.location.back();
      });
  }

}
