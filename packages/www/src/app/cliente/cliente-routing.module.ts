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
import { BoletosPorClienteResolver } from '../core/services/boleto/boletos-por-cliente-resolver.service';
import { PontosAcessoPorClienteResolver } from '../core/services/ponto-acesso/pontos-acesso-por-cliente-resolver.service';
import { CarnesPorClienteResolver } from '../core/services/carne/carnes-por-cliente-resolver.service';
import { ClienteByIdFullDataResolver } from '../core/services/cliente/cliente-by-id-full-data-resolver.service';
import { PontoAcessoByIdFulldataResolver } from '../core/services/ponto-acesso/ponto-acesso-by-id-fulldata-resolver.service';

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
    path: 'edit/:cliente',
    component: FormClienteComponent,
    canActivate: [AuthGuard],
    resolve: {
      cliente: ClienteByIdFullDataResolver,
      contasBancarias: ListaContasBancariasResolver,
    },
  },
  {
    path: 'detalhe/:cliente',
    component: DetalhesClienteComponent,
    canActivate: [ AuthGuard ],
    resolve: {
      cliente: ClienteByIdResolver,
      boletos: BoletosPorClienteResolver,
      pontosAcesso: PontosAcessoPorClienteResolver,
      carnes: CarnesPorClienteResolver,
    }
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
    path: 'pa/edit/:idpontoacesso',
    component: FormPontoAcessoComponent,
    canActivate: [AuthGuard],
    resolve: {
      pontoAcesso: PontoAcessoByIdFulldataResolver,
      listaPlanos: ListaPlanosResolver,
      listaPools: ListaIpPoolResolver,
      listaOlts: ListaOltResolver,
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
