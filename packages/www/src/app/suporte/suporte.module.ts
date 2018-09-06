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
  MatDatepickerModule,
  MAT_DATE_FORMATS,
  MatSlideToggleModule,
} from '@angular/material';

import { SuporteRoutingModule } from './suporte-routing.module';
import { FormProblemaChamadoComponent } from './problema-chamado/form-problema-chamado/form-problema-chamado.component';
import { ListarProblemasChamadoComponent } from './problema-chamado/listar-problemas-chamado/listar-problemas-chamado.component';
import { AberturaChamadoComponent } from './chamado/abertura-chamado/abertura-chamado.component';
import { ChamadosAbertosComponent } from './chamado/chamados-abertos/chamados-abertos.component';
import { ChamadoActionSheetComponent } from './chamado/chamado-action-sheet/chamado-action-sheet.component';
import { AbrirInstalacaoComponent } from './abrir-instalacao/abrir-instalacao.component';
import { ListarInstalacoesComponent } from './listar-instalacoes/listar-instalacoes.component';

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
    MatDatepickerModule,
    MatSlideToggleModule,
  ],
  declarations: [
    FormProblemaChamadoComponent,
    ListarProblemasChamadoComponent,
    AberturaChamadoComponent,
    ChamadosAbertosComponent,
    ChamadoActionSheetComponent,
    AbrirInstalacaoComponent,
    ListarInstalacoesComponent,
  ],
  entryComponents: [
    ChamadoActionSheetComponent,
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    }
  ]
})
export class SuporteModule { }
