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
  MatListModule,
  MatBottomSheetModule,
} from '@angular/material';

import { SuporteRoutingModule } from './suporte-routing.module';
import { FormProblemaChamadoComponent } from './problema-chamado/form-problema-chamado/form-problema-chamado.component';
import { ListarProblemasChamadoComponent } from './problema-chamado/listar-problemas-chamado/listar-problemas-chamado.component';
import { AberturaChamadoComponent } from './chamado/abertura-chamado/abertura-chamado.component';
import { ChamadosAbertosComponent } from './chamado/chamados-abertos/chamados-abertos.component';
import { ChamadoActionSheetComponent } from './chamado/chamado-action-sheet/chamado-action-sheet.component';

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
    MatListModule,
    MatBottomSheetModule,
  ],
  declarations: [
    FormProblemaChamadoComponent,
    ListarProblemasChamadoComponent,
    AberturaChamadoComponent,
    ChamadosAbertosComponent,
    ChamadoActionSheetComponent,
  ],
  entryComponents: [
    ChamadoActionSheetComponent,
  ],
})
export class SuporteModule { }
