import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Employee, Product, TableRows, TopSelling } from 'src/app/component/table/table-data';

@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.scss'],
  standalone: true,
  imports:[NgFor]
})
export class TipoVehiculoComponent {
  topSelling: Product[];

  trow: TableRows[];

  constructor() {

    this.topSelling = TopSelling;

    this.trow = Employee;
  }
}
