import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { ListarContasBancariasComponent } from './conta-bancaria/listar-contas-bancarias/listar-contas-bancarias.component';
import {
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import { FormContaBancariaComponent } from './conta-bancaria/form-conta-bancaria/form-conta-bancaria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FinanceiroRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  declarations: [
    ListarContasBancariasComponent,
    FormContaBancariaComponent,
  ]
})
export class FinanceiroModule { }
