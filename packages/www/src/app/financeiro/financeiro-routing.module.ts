import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarContasBancariasComponent } from './conta-bancaria/listar-contas-bancarias/listar-contas-bancarias.component';
import { AuthGuard } from '../auth/auth.guard';
import { FormContaBancariaComponent } from './conta-bancaria/form-conta-bancaria/form-conta-bancaria.component';
import { ListarBoletosComponent } from './boletos/listar-boletos/listar-boletos.component';
import { GerarRemessaComponent } from './cnab/gerar-remessa/gerar-remessa.component';
import { ListaContasBancariasResolver } from '../core/services/conta-bancaria/lista-contas-bancarias-resolver.service';
import { ListarRemessasComponent } from './cnab/listar-remessas/listar-remessas.component';
import { UploadRetornoComponent } from './cnab/upload-retorno/upload-retorno.component';
import { ListarRetornoComponent } from './cnab/listar-retorno/listar-retorno.component';
import { DetalharBoletoComponent } from './boletos/detalhar-boleto/detalhar-boleto.component';
import { BoletoByIdResolver } from '../core/services/boleto/boleto-by-id-resolver.service';
import { ContaBancariaByIdResolver } from '../core/services/conta-bancaria/conta-bancaria-by-id-resolver.service';

const routes: Routes = [
  {
    path: 'contasbancarias/add',
    component: FormContaBancariaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contasbancarias/:idcontabancaria',
    component: FormContaBancariaComponent,
    canActivate: [AuthGuard],
    resolve: {
      contabancaria: ContaBancariaByIdResolver,
    },
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
  {
    path: 'boletos/:idboleto',
    component: DetalharBoletoComponent,
    canActivate: [AuthGuard],
    resolve: {
      boleto: BoletoByIdResolver,
    }
  },
  {
    path: 'cnab/remessa/gerar',
    component: GerarRemessaComponent,
    canActivate: [AuthGuard],
    resolve: {
      contasBancarias: ListaContasBancariasResolver,
    }
  },
  {
    path: 'cnab/remessa',
    component: ListarRemessasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cnab/retorno/upload',
    component: UploadRetornoComponent,
    canActivate: [AuthGuard],
    resolve: {
      contasBancarias: ListaContasBancariasResolver,
    },
  },
  {
    path: 'cnab/retorno',
    component: ListarRetornoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
