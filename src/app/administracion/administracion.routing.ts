import { Routes } from '@angular/router';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { TipoProductoComponent } from './tipo-producto/tipo-producto.component';
import { PaisesListadoComponent } from './paises-listado/paises-listado.component';

export const AdministracionRoutes: Routes = [

	{
		path: '',
		children: [
			{
				path: 'paises',
				component: PaisesListadoComponent
			},
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
