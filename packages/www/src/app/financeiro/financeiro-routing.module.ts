import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarContasBancariasComponent } from './conta-bancaria/listar-contas-bancarias/listar-contas-bancarias.component';
import { AuthGuard } from '../auth/auth.guard';
import { FormContaBancariaComponent } from './conta-bancaria/form-conta-bancaria/form-conta-bancaria.component';
import { ListarBoletosComponent } from './boletos/listar-boletos/listar-boletos.component';
import { GerarRemessaComponent } from './cnab/gerar-remessa/gerar-remessa.component';
import { ListaContasBancariasResolver } from '../core/services/conta-bancaria/lista-contas-bancarias-resolver.service';

const routes: Routes = [
  {
    path: 'contasbancarias/add',
    component: FormContaBancariaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contasbancarias',
    component: ListarContasBancariasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'boletos',
    component: ListarBoletosComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'cnab/remessa/gerar',
    component: GerarRemessaComponent,
    canActivate: [AuthGuard],
    resolve: {
      contasBancarias: ListaContasBancariasResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
