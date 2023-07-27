import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministracionRoutes } from './administracion.routing';
import { ComponentsModule } from '../component/component.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoProductoComponent } from './tipo-producto/tipo-producto.component'; // Import MatSnackBarModule


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,

    RouterModule.forChild(AdministracionRoutes),
  ],
  declarations: [
    TipoVehiculoComponent,
    TipoProductoComponent
  ]
})
export class AdministracionModule { }
