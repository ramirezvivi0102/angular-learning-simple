import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministracionRoutes } from './administracion.routing';
import { ComponentsModule } from '../component/component.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BaseHeroesComponent } from './base-heroes/base-heroes.component';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    NgApexchartsModule,
    RouterModule.forChild(AdministracionRoutes),
  ],
  declarations: [
    TipoVehiculoComponent,
    BaseHeroesComponent
  ]
})
export class AdministracionModule { }
