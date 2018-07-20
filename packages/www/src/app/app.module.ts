import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatSidenavModule, MatIconModule, MatPaginatorIntl, DateAdapter } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ApolloConfigModule } from './apollo-config.module';
import { AuthModule } from './auth/auth.module';
import { MatPaginatorIntlPtBr } from './mat-paginator-pt-br';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ApolloConfigModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatSidenavModule,
    MatIconModule,
    AuthModule,
    CoreModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlPtBr
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
