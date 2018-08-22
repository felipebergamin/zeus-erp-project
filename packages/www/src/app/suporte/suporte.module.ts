import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatDividerModule,
} from '@angular/material';

import { SuporteRoutingModule } from './suporte-routing.module';
import { FormProblemaChamadoComponent } from './problema-chamado/form-problema-chamado/form-problema-chamado.component';
import { ListarProblemasChamadoComponent } from './problema-chamado/listar-problemas-chamado/listar-problemas-chamado.component';
import { AberturaChamadoComponent } from './chamado/abertura-chamado/abertura-chamado.component';
import { ChamadosAbertosComponent } from './chamado/chamados-abertos/chamados-abertos.component';

@NgModule({
  imports: [
    CommonModule,
    SuporteRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDividerModule,
  ],
  declarations: [FormProblemaChamadoComponent, ListarProblemasChamadoComponent, AberturaChamadoComponent, ChamadosAbertosComponent]
})
export class SuporteModule { }
