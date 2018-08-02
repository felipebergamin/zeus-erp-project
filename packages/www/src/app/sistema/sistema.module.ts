import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { ListarUsuariosComponent } from './usuario/listar-usuarios/listar-usuarios.component';
import {
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
} from '@angular/material';
import { ListarPerfisUsuarioComponent } from './perfil-usuario/listar-perfis-usuario/listar-perfis-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    SistemaRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [ListarUsuariosComponent, ListarPerfisUsuarioComponent]
})
export class SistemaModule { }
