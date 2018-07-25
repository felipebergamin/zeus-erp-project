import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarContasBancariasComponent } from './conta-bancaria/listar-contas-bancarias/listar-contas-bancarias.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'contasbancarias',
    component: ListarContasBancariasComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
