import gql from 'graphql-tag';
import { PerfilUsuario } from '../../models/PerfilUsuario';

export interface ListarPerfisUsuarioQuery {
  listarPerfisUsuario: PerfilUsuario[];
  totalPerfisUsuario: number;
}

export interface PerfilUsuarioInput {
    nome: string;

    leitura: boolean;
    escrita: boolean;

    alterarClientes: boolean;
    bloquearClientes: boolean;
    criarClientes: boolean;
    desativarClientes: boolean;
    desbloquearClientes: boolean;
    visualizarClientes: boolean;

    alterarBoletos: boolean;
    criarBoletos: boolean;
    gerarRemessa: boolean;
    importarRetorno: boolean;
    receberBoletos: boolean;
    removerBoletos: boolean;
    visualizarBoletos: boolean;
    pedirBaixaBoleto: boolean;

    alterarUsuarios: boolean;
    criarUsuarios: boolean;
    removerUsuarios: boolean;
    visualizarUsuarios: boolean;

    abrirChamadoTecnico: boolean;
    alterarChamadoTecnico: boolean;
    cancelarChamadoTecnico: boolean;
    fecharChamadoTecnico: boolean;
    visualizarChamados: boolean;

    abrirInstalacao: boolean;
    alterarInstalacao: boolean;
    cancelarInstalacao: boolean;
    visualizarInstalacao: boolean;
    finalizarInstalacao: boolean;

    acessaAppTecnico: boolean;
    acessoTelegram: boolean;
    acessoWeb: boolean;
    visualizarLogs: boolean;
}

export const LISTAR_PERFIS_USUARIO_QUERY = gql`
  query listarPerfis($first: Int, $offset: Int, $nopaginate: Boolean) {
    listarPerfisUsuario(first: $first, offset: $offset, nopaginate: $nopaginate) {
      _id
      nome
      createdAt
    }
    totalPerfisUsuario
  }
`;

export const CRIAR_PERFIL_USUARIO_MUTATION = gql`
  mutation criarPerfil($input: PerfilUsuarioInput!) {
    createUserProfile(input: $input) {
      _id
      createdAt
    }
  }
`;
