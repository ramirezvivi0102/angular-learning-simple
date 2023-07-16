import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsRoutes } from '../component/component.routing';
import { AdministracionRoutes } from './administracion.routing';
import { ComponentsModule } from '../component/component.module';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    NgApexchartsModule,
    RouterModule.forChild(AdministracionRoutes),
  ],
  // declarations: [
  //   TipoVehiculoComponent
  // ]
})
export class AdministracionModule { }
