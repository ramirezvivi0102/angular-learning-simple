import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministracionRoutes } from './administracion.routing';
import { ComponentsModule } from '../component/component.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoProductoComponent } from './tipo-producto/tipo-producto.component';
import { PaisesEditarComponent } from './paises-editar/paises-editar.component';
import { PaisesListadoComponent } from './paises-listado/paises-listado.component'; // Import MatSnackBarModule
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { AngularMaterialAllModule } from '../angular-material-all/angular-material-all.module';
import { DialogoEliminarComponent } from './dialogo-eliminar/dialogo-eliminar.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    AngularMaterialAllModule,
    RouterModule.forChild(AdministracionRoutes),
  ],
  declarations: [
    TipoVehiculoComponent,
    TipoProductoComponent,
    PaisesEditarComponent,
    PaisesListadoComponent,
    DialogoEliminarComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class AdministracionModule { }
