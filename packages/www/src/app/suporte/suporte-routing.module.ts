import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormProblemaChamadoComponent } from './problema-chamado/form-problema-chamado/form-problema-chamado.component';
import { AuthGuard } from '../auth/auth.guard';
import { ListarProblemasChamadoComponent } from './problema-chamado/listar-problemas-chamado/listar-problemas-chamado.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuporteRoutingModule { }
