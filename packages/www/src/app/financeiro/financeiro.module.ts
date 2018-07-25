import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { ListarContasBancariasComponent } from './conta-bancaria/listar-contas-bancarias/listar-contas-bancarias.component';
import { MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FinanceiroRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  declarations: [
    ListarContasBancariasComponent,
  ]
})
export class FinanceiroModule { }
