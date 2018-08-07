import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';

import { arquivoRemessaTypes } from './resources/arquivo-remessa/arquivo-remessa.schema';
import { arquivoRetornoTypes } from './resources/arquivo-retorno/arquivo-retorno.schema';
import { baixaEstoqueTypes } from './resources/baixa-estoque/baixa-estoque.schema';
import { boletoTypes } from './resources/boleto/boleto.schema';
import { carneTypes } from './resources/carne/carne.schema';
import { chamadoTypes } from './resources/chamado-tecnico/chamado-tecnico.schema';
import { clienteTypes } from './resources/cliente/cliente.schema';
import { contaBancariaTypes } from './resources/conta-bancaria/conta-bancaria.schema';
import { fiberhomeTypes } from './resources/fiberhome/fiberhome.schema';
import { instalacaoTypes } from './resources/instalacao/instalacao.schema';
import { ipPoolTypes } from './resources/ip-pool/ip-pool.schema';
import { itemEstoqueTypes } from './resources/item-estoque/item-estoque.schema';
import { lancamentoEstoqueTypes } from './resources/lancamento-estoque/lancamento-estoque.schema';
import { ocorrenciaBancariaTypes } from './resources/ocorrencia-bancaria/ocorrencia-bancaria.schema';
import { oltTypes } from './resources/olt/olt.schema';
import { perfilTypes } from './resources/perfil-usuario/perfil-usuario.schema';
import { planoTypes } from './resources/plano/plano.schema';
import { pontoAcessoTypes } from './resources/ponto-acesso/ponto-acesso.schema';
import { problemaChamadoTypes } from './resources/problema-chamado/problema-chamado.schema';
import { tokenTypes } from './resources/token/token.schema';
import { usuarioTypes } from './resources/usuario/usuario.schema';

import { arquivoRemessaResolvers } from './resources/arquivo-remessa/arquivo-remessa.resolvers';
import { arquivoRetornoResolvers } from './resources/arquivo-retorno/arquivo-retorno.resolvers';
import { baixaEstoqueResolvers } from './resources/baixa-estoque/baixa-estoque.resolvers';
import { boletoResolvers } from './resources/boleto/boleto.resolvers';
import { carneResolvers } from './resources/carne/carne.resolvers';
import { chamadoResolvers } from './resources/chamado-tecnico/chamado-tecnico.resolvers';
import { clienteResolvers } from './resources/cliente/cliente.resolvers';
import { contaBancariaResolvers } from './resources/conta-bancaria/conta-bancaria.resolvers';
import { fiberhomeResolvers } from './resources/fiberhome/fiberhome.resolver';
import { instalacaoResolvers } from './resources/instalacao/instalacao.resolvers';
import { ipPoolResolvers } from './resources/ip-pool/ip-pool.resolvers';
import { itemEstoqueResolvers } from './resources/item-estoque/item-estoque.resolvers';
import { lancamentoEstoqueResolvers } from './resources/lancamento-estoque/lancamento-estoque.resolvers';
import { ocorrenciaBancariaResolvers } from './resources/ocorrencia-bancaria/ocorrencia-bancaria.resolvers';
import { oltResolvers } from './resources/olt/olt.resolvers';
import { perfilUsuarioResolvers } from './resources/perfil-usuario/perfil-usuario.resolvers';
import { planoResolvers } from './resources/plano/plano.resolvers';
import { pontoAcessoResolvers } from './resources/ponto-acesso/ponto-acesso.resolvers';
import { problemaChamadoResolvers } from './resources/problema-chamado/problema-chamado.resolvers';
import { tokenResolvers } from './resources/token/token.resolvers';
import { usuarioResolvers } from './resources/usuario/usuario.resolvers';

import { ResolverContext } from '../interfaces/ResolverContextInterface';
import { Mutation } from './Mutation';
import { Query } from './Query';
import { longIntResolverMap } from './scalar/long-int';

const SchemaDefinition = `
  scalar LongInt

  type Schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = merge(
  contaBancariaResolvers,
  clienteResolvers,
  planoResolvers,
  perfilUsuarioResolvers,
  usuarioResolvers,
  tokenResolvers,
  boletoResolvers,
  ocorrenciaBancariaResolvers,
  carneResolvers,
  oltResolvers,
  ipPoolResolvers,
  pontoAcessoResolvers,
  problemaChamadoResolvers,
  chamadoResolvers,
  instalacaoResolvers,
  itemEstoqueResolvers,
  baixaEstoqueResolvers,
  lancamentoEstoqueResolvers,
  arquivoRemessaResolvers,
  arquivoRetornoResolvers,
  longIntResolverMap,
  fiberhomeResolvers,
);

const schema = makeExecutableSchema({
  resolvers,
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    contaBancariaTypes,
    planoTypes,
    clienteTypes,
    perfilTypes,
    usuarioTypes,
    tokenTypes,
    boletoTypes,
    ocorrenciaBancariaTypes,
    carneTypes,
    oltTypes,
    ipPoolTypes,
    pontoAcessoTypes,
    problemaChamadoTypes,
    chamadoTypes,
    instalacaoTypes,
    itemEstoqueTypes,
    baixaEstoqueTypes,
    lancamentoEstoqueTypes,
    arquivoRemessaTypes,
    arquivoRetornoTypes,
    fiberhomeTypes,
  ],
});

export const makeGraphQLServer = (context: ResolverContext): ApolloServer => {
  return new ApolloServer({
    context: ({ req }) => {
      const httpContext: ResolverContext = req['context'];

      return {
        ...context,
        ...httpContext,
      };
    },
    engine: {
      apiKey: 'service:felipebergamin-6502:G25-6nNefNIALF1Gdmk6zg',
    },
    schema,
  });
};
