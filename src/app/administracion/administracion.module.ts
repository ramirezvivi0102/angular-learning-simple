import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsRoutes } from '../component/component.routing';
import { AdministracionRoutes } from './administracion.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdministracionRoutes),
  ],
  // declarations: [
  //   TipoVehiculoComponent
  // ]
})
export class AdministracionModule { }
