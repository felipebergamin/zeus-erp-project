import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { PerfilUsuarioService } from '../../../core/services/perfil-usuario/perfil-usuario.service';
import { PerfilUsuario } from '../../../core/models/PerfilUsuario';
import { valueIn } from '../../../form-validators/value-in';
import { UsuarioService } from '../../../core/services/usuario/usuario.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tiposUsuario = [ 'tecnico', 'gerente', 'atendente', 'desenvolvedor', 'outro' ];
  listaPerfis$ = new BehaviorSubject<PerfilUsuario[]>([]);

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilUsuarioService,
    private usuarioService: UsuarioService,
    private snackbar: MatSnackBar,
    private location: Location,
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

    this.perfilService.listar({ nopaginate: true })
      .pipe(map(res => res.listarPerfisUsuario))
      .subscribe(this.listaPerfis$);
  }

  ngOnDestroy() {
    this.listaPerfis$.complete();
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
