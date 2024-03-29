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
  MatSnackBarModule,
  MatSelectModule,
  MatDatepickerModule,
  MAT_DATE_FORMATS,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatListModule,
  MatMenuModule,
} from '@angular/material';
import { FormContaBancariaComponent } from './conta-bancaria/form-conta-bancaria/form-conta-bancaria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListarBoletosComponent } from './boletos/listar-boletos/listar-boletos.component';
import { GerarRemessaComponent } from './cnab/gerar-remessa/gerar-remessa.component';
import { ListarRemessasComponent } from './cnab/listar-remessas/listar-remessas.component';
import { UploadRetornoComponent } from './cnab/upload-retorno/upload-retorno.component';
import { ExibirDetalhesRetornoComponent } from './cnab/exibir-detalhes-retorno/exibir-detalhes-retorno.component';
import { ListarRetornoComponent } from './cnab/listar-retorno/listar-retorno.component';
import { DetalharBoletoComponent } from './boletos/detalhar-boleto/detalhar-boleto.component';
import { SharedModule } from '../shared/shared.module';
import { ContaBancariaActionSheetComponent } from './conta-bancaria/conta-bancaria-action-sheet/conta-bancaria-action-sheet.component';

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
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatListModule,
    SharedModule,
    MatMenuModule,
  ],
  declarations: [
    ListarContasBancariasComponent,
    FormContaBancariaComponent,
    ListarBoletosComponent,
    GerarRemessaComponent,
    ListarRemessasComponent,
    UploadRetornoComponent,
    ExibirDetalhesRetornoComponent,
    ListarRetornoComponent,
    DetalharBoletoComponent,
    ContaBancariaActionSheetComponent,
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
export class FinanceiroModule { }
