import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { ListarClientesComponent } from './cliente/listar-clientes/listar-clientes.component';

import { FormPontoAcessoComponent } from './ponto-acesso/form-ponto-acesso/form-ponto-acesso.component';
import { ListarPontosAcessoComponent } from './ponto-acesso/listar-pontos-acesso/listar-pontos-acesso.component';
import { DetalhesClienteComponent } from './cliente/detalhes-cliente/detalhes-cliente.component';
import { ListaContasBancariasResolver } from '../core/services/conta-bancaria/lista-contas-bancarias-resolver.service';
import { ListaPlanosResolver } from '../core/services/plano/lista-planos-resolver.service';
import { ListaIpPoolResolver } from '../core/services/ip-pool/lista-ip-pool-resolver.service';
import { ListaOltResolver } from '../core/services/olt/lista-olt-resolver.service';
import { ClienteByIdResolver } from '../core/services/cliente/cliente-by-id-resolver.service';

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
    resolve: {
      contasBancarias: ListaContasBancariasResolver,
    },
  },
  {
    path: 'detalhe/:clienteID',
    component: DetalhesClienteComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'pa/novo/:cliente',
    component: FormPontoAcessoComponent,
    canActivate: [ AuthGuard ],
    resolve: {
      listaPlanos: ListaPlanosResolver,
      listaPools: ListaIpPoolResolver,
      listaOlts: ListaOltResolver,
      cliente: ClienteByIdResolver,
    },
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
