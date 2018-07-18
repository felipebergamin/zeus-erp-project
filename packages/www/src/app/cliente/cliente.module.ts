import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule } from '@angular/material';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ListarClientesComponent } from './components/listar-clientes/listar-clientes.component';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [ListarClientesComponent]
})
export class ClienteModule { }
