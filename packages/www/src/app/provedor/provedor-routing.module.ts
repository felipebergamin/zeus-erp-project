import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarOltsComponent } from './olt/listar-olts/listar-olts.component';
import { AuthGuard } from '../auth/auth.guard';
import { FormOltComponent } from './olt/form-olt/form-olt.component';
import { ListarPlanosComponent } from './plano/listar-planos/listar-planos.component';
import { FormPlanoComponent } from './plano/form-plano/form-plano.component';
import { ListarPoolsIpComponent } from './pool-ip/listar-pools-ip/listar-pools-ip.component';
import { FormPoolIpComponent } from './pool-ip/form-pool-ip/form-pool-ip.component';

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
  },
  {
    path: 'planos/add',
    component: FormPlanoComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'planos',
    component: ListarPlanosComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'pools/add',
    component: FormPoolIpComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'pools',
    component: ListarPoolsIpComponent,
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvedorRoutingModule { }
