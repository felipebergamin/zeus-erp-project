import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: 'src/app/auth/auth.module#AuthModule',
  },
  {
    path: 'cliente',
    loadChildren: 'src/app/cliente/cliente.module#ClienteModule',
    canLoad: [ AuthGuard ]
  },
  {
    path: 'provedor',
    loadChildren: 'src/app/provedor/provedor.module#ProvedorModule',
    canLoad: [ AuthGuard ],
  },
  {
    path: 'financeiro',
    loadChildren: 'src/app/financeiro/financeiro.module#FinanceiroModule',
    canLoad: [ AuthGuard ],
  },
  {
    path: 'sistema',
    loadChildren: 'src/app/sistema/sistema.module#SistemaModule',
    canLoad: [ AuthGuard ],
  },
  {
    path: 'suporte',
    loadChildren: 'src/app/suporte/suporte.module#SuporteModule',
    canLoad: [ AuthGuard ],
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {

}
