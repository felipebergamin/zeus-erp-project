import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatBottomSheetModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatDividerModule,
} from '@angular/material';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ListarClientesComponent } from './cliente/listar-clientes/listar-clientes.component';
import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { ClienteActionSheetComponent } from './cliente/cliente-action-sheet/cliente-action-sheet.component';

import { FormPontoAcessoComponent } from './ponto-acesso/form-ponto-acesso/form-ponto-acesso.component';
import { ListarPontosAcessoComponent } from './ponto-acesso/listar-pontos-acesso/listar-pontos-acesso.component';
import { DetalhesClienteComponent } from './cliente/detalhes-cliente/detalhes-cliente.component';
import { LancarBoletoComponent } from './cliente/lancar-boleto/lancar-boleto.component';
import { LancarCarneComponent } from './cliente/lancar-carne/lancar-carne.component';
import { PontoAcessoActionSheetComponent } from './ponto-acesso/ponto-acesso-action-sheet/ponto-acesso-action-sheet.component';
import { ExibirSinalOnuComponent } from './ponto-acesso/exibir-sinal-onu/exibir-sinal-onu.component';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatDividerModule,
  ],
  declarations: [
    ListarClientesComponent,
    FormClienteComponent,
    ListarPontosAcessoComponent,
    FormPontoAcessoComponent,
    ClienteActionSheetComponent,
    DetalhesClienteComponent,
    LancarBoletoComponent,
    LancarCarneComponent,
    PontoAcessoActionSheetComponent,
    ExibirSinalOnuComponent,
  ],
  entryComponents: [
    ClienteActionSheetComponent,
    LancarBoletoComponent,
    LancarCarneComponent,
    PontoAcessoActionSheetComponent,
    ExibirSinalOnuComponent,
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
export class ClienteModule { }
