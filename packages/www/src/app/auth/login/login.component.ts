import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      login: [],
      passwd: [null],
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      const { login, passwd } = this.form.value;

      this.authService.signinUser({ login, passwd })
        .subscribe(
          res => {
            this.router.navigate(['/']);
          }
        );
    }
  }

  onKeepSigned() {
    this.authService.toggleKeepSigned();
  }

}
