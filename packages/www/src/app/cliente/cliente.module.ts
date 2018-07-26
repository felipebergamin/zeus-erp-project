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
} from '@angular/material';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ListarClientesComponent } from './cliente/listar-clientes/listar-clientes.component';
import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { ClienteActionSheetComponent } from './cliente/cliente-action-sheet/cliente-action-sheet.component';

import { FormPontoAcessoComponent } from './ponto-acesso/form-ponto-acesso/form-ponto-acesso.component';
import { ListarPontosAcessoComponent } from './ponto-acesso/listar-pontos-acesso/listar-pontos-acesso.component';

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
  ],
  declarations: [
    ListarClientesComponent,
    FormClienteComponent,
    ListarPontosAcessoComponent,
    FormPontoAcessoComponent,
    ClienteActionSheetComponent,
  ],
  entryComponents: [
    ClienteActionSheetComponent,
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
