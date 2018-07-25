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
    ]
  },
  {
    name: 'Financeiro',
    items: [
      {
        name: 'Listar Contas Bancárias',
        path: '/financeiro/contasbancarias',
      },
    ]
  },
];
