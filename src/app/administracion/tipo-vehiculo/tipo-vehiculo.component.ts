import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee, Product, TableRows, TopSelling } from 'src/app/component/table/table-data';
import { TipoVehiculoService } from '../services/tipo-vehiculo.service';
import { TypeVehicle } from '../models/type-vehiculo';

@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.scss'],
  standalone: true,
  imports:[NgFor]
})
export class TipoVehiculoComponent implements OnInit  {

  typeVehicles: TypeVehicle[] = [];
  
  topSelling: Product[];
  trow: TableRows[];

  constructor(private tipoServicio: TipoVehiculoService) {

    this.topSelling = TopSelling;

    this.trow = Employee;
  }

  ngOnInit(): void {
    // ...
    this.getAllTypeVehicles();
  }

  getAllTypeVehicles(): void {
    this.tipoServicio.getAllTypeVehicles()
      .subscribe(typeVehiclesServer => {
        this.typeVehicles = typeVehiclesServer;
        console.log("servicio: tipoServicio.getAllTypeVehicles() trajo "+ typeVehiclesServer.length + " registros")
      });
  }

  getTypeVehicleById(id: number): void {
    this.tipoServicio.getTypeVehicleById(id)
      .subscribe(typeVehicle => {
        // Handle the retrieved TypeVehicle object
        console.log(typeVehicle);
      });
  }

  createTypeVehicle(): void {
    const newTypeVehicle: TypeVehicle = {
      id: 0, // Set the appropriate ID value
      name: 'New Type Vehicle',
      pattern: 'New Pattern'
    };

    this.tipoServicio.createTypeVehicle(newTypeVehicle)
      .subscribe(createdTypeVehicle => {
        // Handle the created TypeVehicle object
        console.log(createdTypeVehicle);
      });
  }

  updateTypeVehicle(id: number): void {
    const updatedTypeVehicle: TypeVehicle = {
      id: id, // Set the appropriate ID value
      name: 'Updated Type Vehicle',
      pattern: 'Updated Pattern'
    };

    this.tipoServicio.updateTypeVehicle(id, updatedTypeVehicle)
      .subscribe(updatedTypeVehicle => {
        // Handle the updated TypeVehicle object
        console.log(updatedTypeVehicle);
      });
  }

  updatePatchTypeVehicle(id: number): void {
    const updatedTypeVehicle: Partial<TypeVehicle> = {
      name: 'Updated Type Vehicle'
    };

    this.tipoServicio.updatePatchTypeVehicle(id, updatedTypeVehicle)
      .subscribe(updatedTypeVehicle => {
        // Handle the updated TypeVehicle object
        console.log(updatedTypeVehicle);
      });
  }

  deleteTypeVehicle(id: number): void {
    this.tipoServicio.deleteTypeVehicle(id)
      .subscribe(() => {
        // Handle the successful deletion
        console.log('Type Vehicle deleted successfully');
      });
  }


}
