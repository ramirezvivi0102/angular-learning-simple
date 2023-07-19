import { Routes } from '@angular/router';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { BaseHeroesComponent } from './base-heroes/base-heroes.component';

export const AdministracionRoutes: Routes = [

	{
		path: '',
		children: [
			{
				path: 'tipo-vehiculos',
				component: TipoVehiculoComponent
			},
			{
				path: 'base-of-heroes',
				component: BaseHeroesComponent
			},
			
		]
	}
];
