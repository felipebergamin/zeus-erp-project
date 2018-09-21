import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MikrotikRouter } from '../../../core/models/MikrotikRouter';
import { MikrotikRouterService } from '../../../core/services/mikrotik-router/mikrotik-router.service';

@Component({
  selector: 'app-mikrotik-action-sheet',
  templateUrl: './mikrotik-action-sheet.component.html',
  styleUrls: ['./mikrotik-action-sheet.component.scss']
})
export class MikrotikActionSheetComponent implements OnInit {

  @Input() mkrouter: MikrotikRouter;

  @Output() deleteRouter = new EventEmitter();

  constructor(private mkrouterService: MikrotikRouterService) { }

  ngOnInit() {
  }

  excluir(mkrouter: MikrotikRouter) {
    this.mkrouterService.deleteRouter(mkrouter.id)
      .subscribe(
        () => {
          this.deleteRouter.emit();
        },
      );
  }

}
