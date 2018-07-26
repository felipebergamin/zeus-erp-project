import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { ListarClientesComponent } from './cliente/listar-clientes/listar-clientes.component';

import { FormPontoAcessoComponent } from './ponto-acesso/form-ponto-acesso/form-ponto-acesso.component';
import { ListarPontosAcessoComponent } from './ponto-acesso/listar-pontos-acesso/listar-pontos-acesso.component';

const routes: Routes = [
  {
    path: '',
    component: ListarClientesComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'add',
    component: FormClienteComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'pa/novo/:cliente',
    component: FormPontoAcessoComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'pa',
    component: ListarPontosAcessoComponent,
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
