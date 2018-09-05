import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarOltsComponent } from './olt/listar-olts/listar-olts.component';
import { AuthGuard } from '../auth/auth.guard';
import { FormOltComponent } from './olt/form-olt/form-olt.component';
import { ListarPlanosComponent } from './plano/listar-planos/listar-planos.component';
import { FormPlanoComponent } from './plano/form-plano/form-plano.component';
import { ListarPoolsIpComponent } from './pool-ip/listar-pools-ip/listar-pools-ip.component';
import { FormPoolIpComponent } from './pool-ip/form-pool-ip/form-pool-ip.component';
import { MikrotikRoutersListComponent } from './mikrotik/mikrotik-routers-list/mikrotik-routers-list.component';
import { MikrotikRoutersListResolver } from '../core/services/mikrotik-router/mikrotik-routers-list-resolver.service';
import { MikrotikRouterFormComponent } from './mikrotik/mikrotik-router-form/mikrotik-router-form.component';

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
  {
    path: 'mikrotiks',
    component: MikrotikRoutersListComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'mikrotiks/add',
    component: MikrotikRouterFormComponent,
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvedorRoutingModule { }
