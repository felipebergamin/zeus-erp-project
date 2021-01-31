import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OLT } from '../../../core/models/OLT';
import { OltService } from '../../../core/services/olt/olt.service';

@Component({
  selector: 'app-olt-action-sheet',
  templateUrl: './olt-action-sheet.component.html',
  styleUrls: ['./olt-action-sheet.component.scss']
})
export class OltActionSheetComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() olt: OLT;

  @Output() deleteOlt = new EventEmitter();

  constructor(private service: OltService) { }

  ngOnInit() {
  }

  excluir(olt: OLT) {
    if (!olt) {
      return;
    }
    this.service.deleteOlt(olt._id)
      .subscribe((removed: boolean) => {
        if (removed) {
          this.deleteOlt.emit(this.olt._id);
        }
      });
  }

}
