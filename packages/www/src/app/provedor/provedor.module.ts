import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';

import { ProvedorRoutingModule } from './provedor-routing.module';
import { ListarOltsComponent } from './olt/listar-olts/listar-olts.component';
import { FormOltComponent } from './olt/form-olt/form-olt.component';

@NgModule({
  imports: [
    CommonModule,
    ProvedorRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FlexLayoutModule,
  ],
  declarations: [ListarOltsComponent, FormOltComponent]
})
export class ProvedorModule { }
