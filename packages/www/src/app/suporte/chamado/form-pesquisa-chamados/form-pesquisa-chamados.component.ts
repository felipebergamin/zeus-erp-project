import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { clearFalsyProps } from '../../../utils';
import { UsuarioService } from '../../../core/services/usuario/usuario.service';
import { Usuario } from '../../../core/models/Usuario';

@Component({
  selector: 'app-form-pesquisa-chamados',
  templateUrl: './form-pesquisa-chamados.component.html',
  styleUrls: ['./form-pesquisa-chamados.component.scss']
})
export class FormPesquisaChamadosComponent implements OnInit {
  form: FormGroup;
  listaTecnicos: Usuario[];
  listaAtendentes: Usuario[];

  tiposLista = [
    { value: 'abertos', viewValue: 'Abertos' },
    { value: 'fechados', viewValue: 'Fechados' },
    { value: 'cancelados', viewValue: 'Cancelados' },
    { value: 'todos', viewValue: 'Todos' },
  ];

  @Output() doSearch = new EventEmitter();
  @Output() cancelSearch = new EventEmitter();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.form = new FormGroup({
      tipoLista: new FormControl('abertos'),
      protocolo: new FormControl(null),
      cancelado: new FormControl(null),
      finalizado: new FormControl(null),
      tecnico: new FormControl(null),
      abertoPor: new FormControl(null),
    });

    this.usuarioService.buscar({})
      .subscribe(listaUsuarios => {
        this.listaTecnicos = listaUsuarios.filter(usuario => usuario.tipo === 'tecnico');
        this.listaAtendentes = listaUsuarios.filter(usuario => usuario.tipo !== 'tecnico');
      });
  }

  getSearchQuery() {
    const { tipoLista, ...values } = this.form.value;

    switch (tipoLista) {
      case 'abertos':
        return { ...values, cancelado: false, finalizado: false };
      case 'fechados':
        return { ...values, finalizado: true };
      case 'cancelados':
        return { ...values, cancelado: true };
      default:
        return values;
    }
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.doSearch.emit(clearFalsyProps(this.getSearchQuery()));
    }
  }

  cancel() {
    this.cancelSearch.emit();
  }
}
