import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormProblemaChamadoComponent } from './problema-chamado/form-problema-chamado/form-problema-chamado.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'problemas/add',
    component: FormProblemaChamadoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuporteRoutingModule { }
