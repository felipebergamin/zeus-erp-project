import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
} from '@angular/material';

import { SistemaRoutingModule } from './sistema-routing.module';
import { ListarUsuariosComponent } from './usuario/listar-usuarios/listar-usuarios.component';
import { ListarPerfisUsuarioComponent } from './perfil-usuario/listar-perfis-usuario/listar-perfis-usuario.component';
import { FormUsuarioComponent } from './usuario/form-usuario/form-usuario.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    SistemaRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  declarations: [ListarUsuariosComponent, ListarPerfisUsuarioComponent, FormUsuarioComponent]
})
export class SistemaModule { }
