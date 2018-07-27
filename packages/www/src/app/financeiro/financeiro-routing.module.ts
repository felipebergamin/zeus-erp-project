import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarContasBancariasComponent } from './conta-bancaria/listar-contas-bancarias/listar-contas-bancarias.component';
import { AuthGuard } from '../auth/auth.guard';
import { FormContaBancariaComponent } from './conta-bancaria/form-conta-bancaria/form-conta-bancaria.component';
import { ListarBoletosComponent } from './boletos/listar-boletos/listar-boletos.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
