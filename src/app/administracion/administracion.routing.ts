import { Routes } from '@angular/router';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { TipoProductoComponent } from './tipo-producto/tipo-producto.component';
import { PaisesListadoComponent } from './paises-listado/paises-listado.component';
import { ListadoColorsComponent } from './listado-colors/listado-colors.component';
import { MarcaFabricanteComponent } from './marca-fabricante/marca-fabricante.component';

export const AdministracionRoutes: Routes = [

	{
		path: '',
		children: [
			{
				path: 'marca-fabricante',
				component: MarcaFabricanteComponent
			},
			{
				path: 'listado-colors',
				component: ListadoColorsComponent
			},
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
