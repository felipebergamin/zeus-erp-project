import { Component, OnInit, Input } from '@angular/core';
import { Plano } from '../../../core/models/Plano';

@Component({
  selector: 'app-plano-action-sheet',
  templateUrl: './plano-action-sheet.component.html',
  styleUrls: ['./plano-action-sheet.component.scss']
})
export class PlanoActionSheetComponent implements OnInit {

  @Input() plano: Plano;

  constructor() { }

  ngOnInit() {
  }

}
