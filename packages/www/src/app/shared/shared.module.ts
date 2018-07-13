import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { NavbarComponent } from './navbar/navbar.component';
import { PageHeaderComponent } from './component-page-header/page-header.component';
import { ComponentPageTitle } from './page-title/page-title';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CdkAccordionModule
  ],
  declarations: [
    NavbarComponent,
    PageHeaderComponent,
    SidebarComponent
  ],
  providers: [
    ComponentPageTitle
  ],
  exports: [
    NavbarComponent,
    PageHeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
