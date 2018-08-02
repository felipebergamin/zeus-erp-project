import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarUsuariosComponent } from './usuario/listar-usuarios/listar-usuarios.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
