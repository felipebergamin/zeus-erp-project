import { arquivoRemessaQueries } from "./resources/arquivo-remessa/arquivo-remessa.schema";
import { arquivoRetornoQueries } from "./resources/arquivo-retorno/arquivo-retorno.schema";
import { baixaEstoqueQueries } from "./resources/baixa-estoque/baixa-estoque.schema";
import { boletoQueries } from "./resources/boleto/boleto.schema";
import { carneQueries } from "./resources/carne/carne.schema";
import { chamadoQueries } from "./resources/chamado-tecnico/chamado-tecnico.schema";
import { clienteQueries } from "./resources/cliente/cliente.schema";
import { contaBancariaQueries } from "./resources/conta-bancaria/conta-bancaria.schema";
import { instalacaoQueries } from "./resources/instalacao/instalacao.schema";
import { ipPoolQueries } from "./resources/ip-pool/ip-pool.schema";
import { itemEstoqueQueries } from "./resources/item-estoque/item-estoque.schema";
import { lancamentoEstoqueQueries } from "./resources/lancamento-estoque/lancamento-estoque.schema";
import { ocorrenciaBancariaQueries } from "./resources/ocorrencia-bancaria/ocorrencia-bancaria.schema";
import { oltQueries } from "./resources/olt/olt.schema";
import { perfilQueries } from "./resources/perfil-usuario/perfil-usuario.schema";
import { planoQueries } from "./resources/plano/plano.schema";
import { pontoAcessoQueries } from "./resources/ponto-acesso/ponto-acesso.schema";
import { problemaChamadoQueries } from "./resources/problema-chamado/problema-chamado.schema";
import { tokenQueries } from "./resources/token/token.schema";
import { usuarioQueries } from "./resources/usuario/usuario.schema";
import { fiberhomeQueries } from "./resources/fiberhome/fiberhome.schema";

export const Query = `
  type Query {
    ${contaBancariaQueries}
    ${perfilQueries}
    ${planoQueries}
    ${clienteQueries}
    ${usuarioQueries}
    ${tokenQueries}
    ${boletoQueries}
    ${ocorrenciaBancariaQueries}
    ${carneQueries}
    ${oltQueries}
    ${ipPoolQueries}
    ${pontoAcessoQueries}
    ${problemaChamadoQueries}
    ${chamadoQueries}
    ${instalacaoQueries}
    ${itemEstoqueQueries}
    ${baixaEstoqueQueries}
    ${lancamentoEstoqueQueries}
    ${arquivoRemessaQueries}
    ${arquivoRetornoQueries}
    ${fiberhomeQueries}
  }
`;
