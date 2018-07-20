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
        name: 'Listar',
        path: '/cliente',
      },
      {
        name: 'Novo',
        path: '/cliente/add'
      },
    ]
  }
];
