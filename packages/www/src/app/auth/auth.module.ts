import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
