import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      // {
      //   path: 'heroes',
      //   loadChildren: () => import('./base-heroes/base-heroes.module').then(m => m.BaseHeroesModule)
      // }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
