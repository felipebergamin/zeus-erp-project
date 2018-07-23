import { Component, OnInit, Inject } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import { Cliente } from '../../../core/models/Cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-action-sheet',
  templateUrl: './cliente-action-sheet.component.html',
  styleUrls: ['./cliente-action-sheet.component.scss']
})
export class ClienteActionSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public cliente: Cliente,
    private sheetRef: MatBottomSheetRef<ClienteActionSheetComponent>,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  addPAForClient(cli: Cliente) {
    this.sheetRef.dismiss();
    this.router.navigate(['/', 'cliente', 'pa', 'novo', cli._id]);
  }

}
