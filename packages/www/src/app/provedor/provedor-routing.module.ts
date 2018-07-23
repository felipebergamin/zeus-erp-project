import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarOltsComponent } from './olt/listar-olts/listar-olts.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'olts',
    component: ListarOltsComponent,
    canActivate: [ AuthGuard ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvedorRoutingModule { }
