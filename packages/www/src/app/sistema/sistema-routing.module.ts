import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarUsuariosComponent } from './usuario/listar-usuarios/listar-usuarios.component';
import { AuthGuard } from '../auth/auth.guard';
import { ListarPerfisUsuarioComponent } from './perfil-usuario/listar-perfis-usuario/listar-perfis-usuario.component';
import { FormUsuarioComponent } from './usuario/form-usuario/form-usuario.component';

const routes: Routes = [
  {
    path: 'usuarios/add',
    component: FormUsuarioComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'perfilusuario',
    component: ListarPerfisUsuarioComponent,
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
