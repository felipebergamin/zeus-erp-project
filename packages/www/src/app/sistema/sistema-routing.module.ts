import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarUsuariosComponent } from './usuario/listar-usuarios/listar-usuarios.component';
import { AuthGuard } from '../auth/auth.guard';
import { ListarPerfisUsuarioComponent } from './perfil-usuario/listar-perfis-usuario/listar-perfis-usuario.component';
import { FormUsuarioComponent } from './usuario/form-usuario/form-usuario.component';
import { FormPerfilUsuarioComponent } from './perfil-usuario/form-perfil-usuario/form-perfil-usuario.component';
import { ListaPerfisUsuarioResolver } from '../core/services/perfil-usuario/lista-perfis-usuario-resolver.service';

const routes: Routes = [
  {
    path: 'usuarios/add',
    component: FormUsuarioComponent,
    canActivate: [ AuthGuard ],
    resolve: {
      listaPerfis: ListaPerfisUsuarioResolver,
    }
  },
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'perfilusuario/add',
    component: FormPerfilUsuarioComponent,
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
