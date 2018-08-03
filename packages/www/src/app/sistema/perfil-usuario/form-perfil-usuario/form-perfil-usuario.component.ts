import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilUsuarioService } from '../../../core/services/perfil-usuario/perfil-usuario.service';
import { MatSnackBar } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-form-perfil-usuario',
  templateUrl: './form-perfil-usuario.component.html',
  styleUrls: ['./form-perfil-usuario.component.scss']
})
export class FormPerfilUsuarioComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilUsuarioService,
    private snackbar: MatSnackBar,
    private location: Location,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [null, Validators.required],

      leitura: [true, Validators.required],
      escrita: [false, Validators.required],

      alterarClientes: [false, Validators.required],
      bloquearClientes: [false, Validators.required],
      criarClientes: [false, Validators.required],
      desativarClientes: [false, Validators.required],
      desbloquearClientes: [false, Validators.required],
      visualizarClientes: [false, Validators.required],

      alterarBoletos: [false, Validators.required],
      criarBoletos: [false, Validators.required],
      gerarRemessa: [false, Validators.required],
      importarRetorno: [false, Validators.required],
      pedirBaixaBoleto: [false, Validators.required],
      visualizarBoletos: [false, Validators.required],

      alterarUsuarios: [false, Validators.required],
      criarUsuarios: [false, Validators.required],
      removerUsuarios: [false, Validators.required],
      visualizarUsuarios: [false, Validators.required],

      abrirChamadoTecnico: [false, Validators.required],
      alterarChamadoTecnico: [false, Validators.required],
      cancelarChamadoTecnico: [false, Validators.required],
      fecharChamadoTecnico: [false, Validators.required],
      visualizarChamados: [false, Validators.required],

      abrirInstalacao: [false, Validators.required],
      alterarInstalacao: [false, Validators.required],
      cancelarInstalacao: [false, Validators.required],
      visualizarInstalacao: [false, Validators.required],
      finalizarInstalacao: [false, Validators.required],

      acessaAppTecnico: [false, Validators.required],
      acessoTelegram: [false, Validators.required],
      acessoWeb: [false, Validators.required],
      visualizarLogs: [false, Validators.required],
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.perfilService.criar(this.form.value)
        .subscribe(
          res => {
            this.snackbar.open(`Perfil criado! ${res._id}`, 'Ok', { duration: 5000 });
            this.location.back();
          }
        );
    } else {
      this.snackbar.open('O formulário é inválido! Verifique os dados!', 'Ok');
    }
  }

}
