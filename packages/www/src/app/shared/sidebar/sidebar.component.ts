import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { SIDEBAR_ITEMS } from './sidebar-items';
import { ComponentPageTitle } from '../page-title/page-title';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', display: 'none'})),
      state('expanded', style({height: '*', display: 'block'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class SidebarComponent implements OnInit {

  constructor(
    private componentPageTitle: ComponentPageTitle,
  ) { }

  ngOnInit() {
  }

  get items() {
    return SIDEBAR_ITEMS;
  }

  updatePageTitle(item) {
    this.componentPageTitle.title = item.name;
  }

}
