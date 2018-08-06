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
} from '@angular/material';

import { SuporteRoutingModule } from './suporte-routing.module';
import { FormProblemaChamadoComponent } from './problema-chamado/form-problema-chamado/form-problema-chamado.component';

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
  ],
  declarations: [FormProblemaChamadoComponent]
})
export class SuporteModule { }
