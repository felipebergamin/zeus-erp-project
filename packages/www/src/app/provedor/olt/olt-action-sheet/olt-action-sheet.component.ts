import { Component, OnInit, Input } from '@angular/core';
import { OLT } from '../../../core/models/OLT';

@Component({
  selector: 'app-olt-action-sheet',
  templateUrl: './olt-action-sheet.component.html',
  styleUrls: ['./olt-action-sheet.component.scss']
})
export class OltActionSheetComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() olt: OLT;

  constructor() { }

  ngOnInit() {
  }

}
