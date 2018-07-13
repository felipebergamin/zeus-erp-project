import {Component, EventEmitter, NgModule, Output} from '@angular/core';
import {ComponentPageTitle} from '../page-title/page-title';
import {MatButtonModule, MatIconModule} from '@angular/material';

@Component({
  selector: 'app-component-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  constructor(public _componentPageTitle: ComponentPageTitle) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}

@NgModule({
  imports: [MatButtonModule, MatIconModule],
  exports: [PageHeaderComponent],
  declarations: [PageHeaderComponent],
  providers: [ComponentPageTitle],
})
export class ComponentHeaderModule { }
