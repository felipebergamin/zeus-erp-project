import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormProblemaChamadoComponent } from './problema-chamado/form-problema-chamado/form-problema-chamado.component';
import { AuthGuard } from '../auth/auth.guard';
import { ListarProblemasChamadoComponent } from './problema-chamado/listar-problemas-chamado/listar-problemas-chamado.component';
import { AberturaChamadoComponent } from './chamado/abertura-chamado/abertura-chamado.component';
import { ChamadosAbertosComponent } from './chamado/chamados-abertos/chamados-abertos.component';
import { AbrirInstalacaoComponent } from './abrir-instalacao/abrir-instalacao.component';
import { ListaTecnicosResolver } from '../core/services/usuario/lista-tecnicos-resolver.service';
import { PontoAcessoByIdResolver } from '../core/services/ponto-acesso/ponto-acesso-by-id-resolver.service';
import { ListarInstalacoesComponent } from './listar-instalacoes/listar-instalacoes.component';

const routes: Routes = [
  {
    path: 'problemas/add',
    component: FormProblemaChamadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'problemas',
    component: ListarProblemasChamadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chamado/abrir',
    component: AberturaChamadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chamado/aberto',
    component: ChamadosAbertosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'instalacao/abrir',
    component: AbrirInstalacaoComponent,
    canActivate: [AuthGuard],
    resolve: {
      listaTecnicos: ListaTecnicosResolver,
      pontoAcesso: PontoAcessoByIdResolver,
    }
  },
  {
    path: 'instalacao',
    component: ListarInstalacoesComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuporteRoutingModule { }
