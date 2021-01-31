import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plano } from '../../../core/models/Plano';
import { PlanoService } from '../../../core/services/plano/plano.service';

@Component({
  selector: 'app-plano-action-sheet',
  templateUrl: './plano-action-sheet.component.html',
  styleUrls: ['./plano-action-sheet.component.scss']
})
export class PlanoActionSheetComponent implements OnInit {

  @Input() plano: Plano;

  @Output() deletePlano = new EventEmitter();

  constructor(private planoService: PlanoService) { }

  ngOnInit() {
  }

  delete(plano: Plano) {
    this.planoService.deletePlano(plano._id)
      .subscribe(
        response => {
          if (response) {
            this.deletePlano.emit(plano._id);
          }
        }
      );
  }

}
