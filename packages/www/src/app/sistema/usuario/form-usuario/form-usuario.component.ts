import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { PerfilUsuario } from '../../../core/models/PerfilUsuario';
import { valueIn } from '../../../form-validators/value-in';
import { UsuarioService } from '../../../core/services/usuario/usuario.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit {
  form: FormGroup;
  tiposUsuario = [ 'tecnico', 'gerente', 'atendente', 'desenvolvedor', 'outro' ];
  listaPerfis: PerfilUsuario[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackbar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      login: [null, Validators.required],
      nome: [null, Validators.required],
      passwd: [null, Validators.required],
      perfil: [null, Validators.required],
      telegramID: [null],
      tipo: [null, [Validators.required, valueIn(this.tiposUsuario)]],
    });

    this.route.data.subscribe(
      data => this.listaPerfis = data.listaPerfis
    );
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.usuarioService.criarUsuario(this.form.value)
        .subscribe(
          res => {
            this.snackbar.open(`Novo usuário criado! ${res._id}`, 'Ok', { duration: 5000 });
            this.location.back();
          }
        );
    } else {
      this.snackbar.open('O formulário é inválido! Por favor, verifique os dados digitados!', 'Ok');
    }
  }

}
