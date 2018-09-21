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
  MatSnackBarModule,
  MatMenuModule
} from '@angular/material';

import { ProvedorRoutingModule } from './provedor-routing.module';
import { ListarOltsComponent } from './olt/listar-olts/listar-olts.component';
import { FormOltComponent } from './olt/form-olt/form-olt.component';
import { ListarPlanosComponent } from './plano/listar-planos/listar-planos.component';
import { FormPlanoComponent } from './plano/form-plano/form-plano.component';
import { ListarPoolsIpComponent } from './pool-ip/listar-pools-ip/listar-pools-ip.component';
import { FormPoolIpComponent } from './pool-ip/form-pool-ip/form-pool-ip.component';
import { MikrotikRoutersListComponent } from './mikrotik/mikrotik-routers-list/mikrotik-routers-list.component';
import { MikrotikRouterFormComponent } from './mikrotik/mikrotik-router-form/mikrotik-router-form.component';
import { OltActionSheetComponent } from './olt/olt-action-sheet/olt-action-sheet.component';
import { PlanoActionSheetComponent } from './plano/plano-action-sheet/plano-action-sheet.component';

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
    MatMenuModule,
  ],
  declarations: [
    ListarOltsComponent,
    FormOltComponent,
    ListarPlanosComponent,
    FormPlanoComponent,
    ListarPoolsIpComponent,
    FormPoolIpComponent,
    MikrotikRoutersListComponent,
    MikrotikRouterFormComponent,
    OltActionSheetComponent,
    PlanoActionSheetComponent,
  ]
})
export class ProvedorModule { }
