import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvedorRoutingModule } from './provedor-routing.module';
import { ListarOltsComponent } from './olt/listar-olts/listar-olts.component';
import { MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ProvedorRoutingModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  declarations: [ListarOltsComponent]
})
export class ProvedorModule { }
