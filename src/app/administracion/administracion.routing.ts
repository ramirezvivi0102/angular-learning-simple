import { Routes } from '@angular/router';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';

export const AdministracionRoutes: Routes = [

	{
		path: '',
		children: [
			{
				path: 'tipo-vehiculos',
				component: TipoVehiculoComponent
			},
			// {
			// 	path: 'card',
			// 	component: CardsComponent
			// },
			
		]
	}
];
