import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public authService: AuthService) {
  }

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
}
