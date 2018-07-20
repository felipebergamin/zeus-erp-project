import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarClientesComponent } from './components/listar-clientes/listar-clientes.component';
import { AuthGuard } from '../auth/auth.guard';
import { FormClienteComponent } from './components/form-cliente/form-cliente.component';
import { ListarPontosAcessoComponent } from './components/listar-pontos-acesso/listar-pontos-acesso.component';

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
