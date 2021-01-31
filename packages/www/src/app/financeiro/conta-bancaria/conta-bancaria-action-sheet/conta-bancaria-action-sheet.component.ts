import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContaBancaria } from '../../../core/models/ContaBancaria';
import { ContaBancariaService } from '../../../core/services/conta-bancaria/conta-bancaria.service';

@Component({
  selector: 'app-conta-bancaria-action-sheet',
  templateUrl: './conta-bancaria-action-sheet.component.html',
  styleUrls: ['./conta-bancaria-action-sheet.component.scss']
})
export class ContaBancariaActionSheetComponent {

  @Input() cb: ContaBancaria;

  @Output() remove = new EventEmitter();

  constructor(private service: ContaBancariaService) { }

  excluir(cb: ContaBancaria) {
    this.service.delete(cb._id)
      .subscribe(
        deleted => {
          this.remove.emit(cb._id);
        }
      );
  }

}
