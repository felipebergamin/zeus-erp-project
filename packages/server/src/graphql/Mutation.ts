import { arquivoRemessaMutations } from "./resources/arquivo-remessa/arquivo-remessa.schema";
import { arquivoRetornoMutations } from "./resources/arquivo-retorno/arquivo-retorno.schema";
import { baixaEstoqueMutations } from "./resources/baixa-estoque/baixa-estoque.schema";
import { boletoMutations } from "./resources/boleto/boleto.schema";
import { carneMutations } from "./resources/carne/carne.schema";
import { chamadoMutations } from "./resources/chamado-tecnico/chamado-tecnico.schema";
import { clienteMutations } from "./resources/cliente/cliente.schema";
import { contaBancariaMutations } from "./resources/conta-bancaria/conta-bancaria.schema";
import { fiberhomeMutations } from "./resources/fiberhome/fiberhome.schema";
import { instalacaoMutations } from "./resources/instalacao/instalacao.schema";
import { ipPoolMutations } from "./resources/ip-pool/ip-pool.schema";
import { itemEstoqueMutations } from "./resources/item-estoque/item-estoque.schema";
import { lancamentoEstoqueMutations } from "./resources/lancamento-estoque/lancamento-estoque.schema";
import { mikrotikRouterMutations } from "./resources/mikrotik-router/mikrotik-router.schema";
import { ocorrenciaBancariaMutations } from "./resources/ocorrencia-bancaria/ocorrencia-bancaria.schema";
import { oltMutations } from "./resources/olt/olt.schema";
import { perfilMutations } from "./resources/perfil-usuario/perfil-usuario.schema";
import { planoMutations } from "./resources/plano/plano.schema";
import { pontoAcessoMutations } from "./resources/ponto-acesso/ponto-acesso.schema";
import { problemaChamadoMutations } from "./resources/problema-chamado/problema-chamado.schema";
import { tokenMutations } from "./resources/token/token.schema";
import { usuarioMutations } from "./resources/usuario/usuario.schema";

export const Mutation = `
  type Mutation {
    ${contaBancariaMutations}
    ${perfilMutations}
    ${planoMutations}
    ${clienteMutations}
    ${usuarioMutations}
    ${tokenMutations}
    ${boletoMutations}
    ${ocorrenciaBancariaMutations}
    ${carneMutations}
    ${oltMutations}
    ${ipPoolMutations}
    ${pontoAcessoMutations}
    ${problemaChamadoMutations}
    ${chamadoMutations}
    ${instalacaoMutations}
    ${itemEstoqueMutations}
    ${baixaEstoqueMutations}
    ${lancamentoEstoqueMutations}
    ${arquivoRemessaMutations}
    ${arquivoRetornoMutations}
    ${fiberhomeMutations}
    ${mikrotikRouterMutations}
  }
`;
