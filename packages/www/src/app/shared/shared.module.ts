import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule } from '@angular/material';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { PageHeaderComponent } from './component-page-header/page-header.component';
import { ComponentPageTitle } from './page-title/page-title';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import { BoletoActionSheetComponent } from './action-sheets/boleto-action-sheet/boleto-action-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CdkAccordionModule,
    RouterModule,
    MatMenuModule,
  ],
  declarations: [
    NavbarComponent,
    PageHeaderComponent,
    SidebarComponent,
    TableToolbarComponent,
    BoletoActionSheetComponent,
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
  ],
})
export class SharedModule { }
