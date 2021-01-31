import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatInputModule } from '@angular/material';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { PageHeaderComponent } from './component-page-header/page-header.component';
import { ComponentPageTitle } from './page-title/page-title';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import { BoletoActionSheetComponent } from './action-sheets/boleto-action-sheet/boleto-action-sheet.component';
import { FormBoletoComponent } from './boleto/form-boleto/form-boleto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CdkAccordionModule,
    RouterModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    FlexLayoutModule,
  ],
  declarations: [
    NavbarComponent,
    PageHeaderComponent,
    SidebarComponent,
    TableToolbarComponent,
    BoletoActionSheetComponent,
    FormBoletoComponent,
  ],
  providers: [
    ComponentPageTitle
  ],
  exports: [
    NavbarComponent,
    PageHeaderComponent,
    SidebarComponent,
    TableToolbarComponent,
    BoletoActionSheetComponent,
  ],
  entryComponents: [
    BoletoActionSheetComponent,
    FormBoletoComponent,
  ],
})
export class SharedModule { }
