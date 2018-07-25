import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarContasBancariasComponent } from './conta-bancaria/listar-contas-bancarias/listar-contas-bancarias.component';
import { AuthGuard } from '../auth/auth.guard';
import { FormContaBancariaComponent } from './conta-bancaria/form-conta-bancaria/form-conta-bancaria.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
