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
        name: 'Add',
        path: '/cliente/add',
      },
      {
        name: 'Desativados',
        path: '/cliente/desativados',
      }
    ]
  },
  {
    name: 'Provedor',
    items: [
      {
        name: 'Contas Bancárias',
        path: '/contasbancarias',
      }
    ]
  }
];
