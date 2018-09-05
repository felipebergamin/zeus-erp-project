export interface CategoryItem {
  name: string;
  path: string;
}

export interface SidebarCategory {
  name: string;
  items: CategoryItem[];
}

export const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    name: 'Clientes',
    items: [
      {
        name: 'Listar Clientes',
        path: '/cliente',
      },
      {
        name: 'Novo Cliente',
        path: '/cliente/add'
      },
      {
        name: 'Listar Pontos de Acesso',
        path: '/cliente/pa',
      },
    ]
  },
  {
    name: 'Provedor',
    items: [
      {
        name: 'Listar OLT\'s',
        path: '/provedor/olts',
      },
      {
        name: 'Nova OLT',
        path: '/provedor/olts/add',
      },
      {
        name: 'Listar Planos',
        path: '/provedor/planos',
      },
      {
        name: 'Novo Plano',
        path: '/provedor/planos/add',
      },
      {
        name: 'IP Pools',
        path: '/provedor/pools',
      },
      {
        name: 'Novo Pool',
        path: '/provedor/pools/add',
      },
      {
        name: 'Roteadores Mikrotik',
        path: '/provedor/mikrotiks',
      },
    ]
  },
  {
    name: 'Financeiro',
    items: [
      {
        name: 'Listar Contas Bancárias',
        path: '/financeiro/contasbancarias',
      },
      {
        name: 'Nova Conta Bancária',
        path: '/financeiro/contasbancarias/add',
      },
      {
        name: 'Listar Boletos',
        path: '/financeiro/boletos',
      },
      {
        name: 'Remessa Bancária',
        path: '/financeiro/cnab/remessa',
      },
      {
        name: 'Retorno Bancário',
        path: '/financeiro/cnab/retorno',
      },
    ]
  },
  {
    name: 'Sistema',
    items: [
      {
        name: 'Usuários',
        path: '/sistema/usuarios',
      },
      {
        name: 'Novo Usuário',
        path: '/sistema/usuarios/add',
      },
      {
        name: 'Perfil de Usuário',
        path: '/sistema/perfilusuario',
      },
      {
        name: 'Novo Perfil de Usuário',
        path: '/sistema/perfilusuario/add'
      }
    ]
  },
  {
    name: 'Suporte',
    items: [
      {
        name: 'Abrir Chamado',
        path: '/suporte/chamado/abrir',
      },
      {
        name: 'Chamados Abertos',
        path: '/suporte/chamado/aberto',
      },
      {
        name: 'Problemas De Chamado',
        path: '/suporte/problemas',
      },
    ]
  },
];
