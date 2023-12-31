import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'heroes',
        loadChildren: () => import('./base-heroes/base-heroes.module').then(m => m.BaseHeroesModule)
      },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'administracion-mod',
        loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
