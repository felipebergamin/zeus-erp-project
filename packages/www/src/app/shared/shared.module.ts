import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { PageHeaderComponent } from './component-page-header/page-header.component';
import { ComponentPageTitle } from './page-title/page-title';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CdkAccordionModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    PageHeaderComponent,
    SidebarComponent,
    TableToolbarComponent
  ],
  providers: [
    ComponentPageTitle
  ],
  exports: [
    NavbarComponent,
    PageHeaderComponent,
    SidebarComponent,
    TableToolbarComponent,
  ]
})
export class SharedModule { }
