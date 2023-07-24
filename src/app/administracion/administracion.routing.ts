import { Routes } from '@angular/router';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { TipoProductoComponent } from './tipo-producto/tipo-producto.component';

export const AdministracionRoutes: Routes = [

	{
		path: '',
		children: [
			{
				path: 'tipo-vehiculos',
				component: TipoVehiculoComponent
			},
			{
				path: 'tipo-producto',
				component:TipoProductoComponent

			},
			
		]
	}
];
