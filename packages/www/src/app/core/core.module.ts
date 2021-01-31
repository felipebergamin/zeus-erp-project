import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApolloConfigModule } from '../apollo-config.module';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    ApolloConfigModule,
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
