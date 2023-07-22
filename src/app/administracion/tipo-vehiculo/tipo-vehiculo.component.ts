import { Component, OnInit } from '@angular/core';
import { TipoVehiculoService } from '../services/tipo-vehiculo.service';
import { TypeVehicle } from '../models/type-vehiculo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.scss'],
})
export class TipoVehiculoComponent implements OnInit {
  typeVehicles: TypeVehicle[] = [];

  displayStyle = 'none';

  enEdicion = false;
  form: FormGroup;
  submitted: boolean = false;

  registroSeleccionado: TypeVehicle | undefined;

  constructor(
    private tipoServicio: TipoVehiculoService,
    private formBuilder: FormBuilder
  ) 
  {}

  ngOnInit(): void {
    // ...
    this.getAllTypeVehicles();
    this.configurarForm();
  }

  configurarForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      pattern: ['', [Validators.required, Validators.maxLength(15)]]
    });
  }

  // Se ejecuta cuando se hace clic en el boton submit del formulario
  onSubmitForm(){

    this.submitted = true;

    if (this.form.invalid) {
      console.log("Fallo validacion")
      return;
    }

    this.createTypeVehicle(this.form.value);
  }

  onResetForm(){
debugger;
  }

  onMostrarFormulario(){
    this.enEdicion = true;
  }

  onCancelarForm(){
    this.enEdicion = false;
  }

  itemForm(formItem): any {
    return this.form.controls[formItem];
  }



  // Acciones de boton eliminar

  abrirPopUpEliminar(typeVehicule: TypeVehicle) {
    this.displayStyle = 'block';
    this.registroSeleccionado = typeVehicule;
  }

  cerrarPopUpEliminar() {
    this.displayStyle = 'none';
  }

  // Funciones de acceso al servicio base de datos
  getAllTypeVehicles(): void {
    this.tipoServicio.getAllTypeVehicles().subscribe((typeVehiclesServer) => {
      this.typeVehicles = typeVehiclesServer;
      console.log(
        'servicio: tipoServicio.getAllTypeVehicles() trajo ' +
          typeVehiclesServer.length +
          ' registros'
      );
    });
  }

  getTypeVehicleById(id: number): void {
    this.tipoServicio.getTypeVehicleById(id).subscribe((typeVehicle) => {
      // Handle the retrieved TypeVehicle object
      console.log(typeVehicle);
    });
  }

  createTypeVehicle(newTypeVehicle: TypeVehicle): void {

    console.log("Llamando servicio back crear TipoVehiculo..")

    this.tipoServicio
      .createTypeVehicle(newTypeVehicle)
      .subscribe((createdTypeVehicle) => {
        // Handle the created TypeVehicle object
        console.log(createdTypeVehicle);
        this.getAllTypeVehicles();
        this.onCancelarForm();
      });
  }

  updateTypeVehicle(id: number): void {
    const updatedTypeVehicle: TypeVehicle = {
      id: id, // Set the appropriate ID value
      name: 'Updated Type Vehicle',
      pattern: 'Updated Pattern',
    };

    this.tipoServicio
      .updateTypeVehicle(id, updatedTypeVehicle)
      .subscribe((updatedTypeVehicle) => {
        // Handle the updated TypeVehicle object
        console.log(updatedTypeVehicle);
      });
  }

  updatePatchTypeVehicle(id: number): void {
    const updatedTypeVehicle: Partial<TypeVehicle> = {
      name: 'Updated Type Vehicle',
    };

    this.tipoServicio
      .updatePatchTypeVehicle(id, updatedTypeVehicle)
      .subscribe((updatedTypeVehicle) => {
        // Handle the updated TypeVehicle object
        console.log(updatedTypeVehicle);
      });
  }

  deleteTypeVehicle(id: number): void {
    this.tipoServicio.deleteTypeVehicle(id).subscribe(() => {
      // Handle the successful deletion
      console.log('Type Vehicle deleted successfully');
      this.cerrarPopUpEliminar();
      this.getAllTypeVehicles();
    });
  }
}
