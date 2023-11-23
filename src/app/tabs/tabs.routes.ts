import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4',
        children: [
          {
            path: 'items',
            loadComponent: () =>
              import('../item-list/item-list.component').then((m) => m.ItemListComponent),
          },
          {
            path: 'food',
            loadComponent: () =>
              import('../item/item.component').then((m) => m.ItemComponent),
          },
          {
            path: 'food/:id',
            loadComponent: () =>
              import('../item/item.component').then((m) => m.ItemComponent),
          },
          {
            path: '',
            redirectTo: 'foods',
            pathMatch: 'full',
          }
        ],
        loadComponent: () =>
          import('../tab4/tab4.page').then((m) => m.Tab4Page),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
