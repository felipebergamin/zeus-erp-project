import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarOltsComponent } from './olt/listar-olts/listar-olts.component';
import { AuthGuard } from '../auth/auth.guard';
import { FormOltComponent } from './olt/form-olt/form-olt.component';

const routes: Routes = [
  {
    path: 'olts/add',
    component: FormOltComponent,
    canActivate: [ AuthGuard ],
  },
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
