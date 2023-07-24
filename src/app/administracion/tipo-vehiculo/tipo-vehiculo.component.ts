import { Component, OnInit } from '@angular/core';
import { TipoVehiculoService } from '../services/tipo-vehiculo.service';
import { TypeVehicle } from '../models/type-vehiculo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

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

  idRegistro: number = 0;

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
      pattern: ['', [Validators.required, Validators.maxLength(16)]]
    });
  }

  onActualizarForm(){

    this.submitted = true;

    if (this.form.invalid) {
      console.log("Fallo validacion")
      return;
    }

    console.log("llama updateTypeVehicle()")
    this.updateTypeVehicle(this.idRegistro, this.form.value);
  }

  // Se ejecuta cuando se hace clic en el boton submit del formulario
  onSubmitForm(){

    this.submitted = true;

    if (this.form.invalid) {
      console.log("Fallo validacion")
      return;
    }

    console.log("llama createTypeVehicle()")
    this.createTypeVehicle(this.form.value);
  }

  onResetForm(){
    this.form.reset();
  }

  mostrarFormularioModificar(typeVehicule: TypeVehicle) {
    this.enEdicion = true;
    this.idRegistro = typeVehicule.id;
    this.form.patchValue({
      name: typeVehicule.name,
      pattern: typeVehicule.pattern
    });
    this.gotoTop();
  }

  onMostrarFormulario(){
    this.submitted = false;
    this.idRegistro = 0;
    this.enEdicion = true;
    this.onResetForm();
    this.gotoTop();
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

    this.tipoServicio
      .getAllTypeVehicles()
      .subscribe({

        next: (listTipoServicio) => {
          this.typeVehicles = listTipoServicio;
          console.log(
            'servicio: tipoServicio.getAllTypeVehicles() trajo ' +
            listTipoServicio.length +
              ' registros'
          );
        },

        error: (e) => {
          alert("hubo un error al crear nuevo registro en el servidor")
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a createTypeVehicle')
        },

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
      .subscribe({

        next: (createdTypeVehicle) => {
          console.log(createdTypeVehicle);
          alert("ok registro creado correcatamente")
          this.getAllTypeVehicles();
          this.onCancelarForm();
        },

        error: (e) => {
          alert("hubo un error al crear nuevo registro en el servidor")
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a createTypeVehicle')
        },

      });

  }

  updateTypeVehicle(id: number, updatedTypeVehicle: TypeVehicle): void {

    this.tipoServicio
      .updateTypeVehicle(id, updatedTypeVehicle)
      .subscribe({

        next: (updatedTypeVehicle) => {
          console.log(updatedTypeVehicle);
          alert("ok registro actualizado correcatamente")
          this.getAllTypeVehicles();
          this.onCancelarForm();
        },

        error: (e) => {
          alert("hubo un error al actualizar en el servidor")
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a updateTipoVEHICULO')
        },

      });
  
  }

  updatePatchTypeVehicle(id: number): void {
    const updatedTypeVehicle: Partial<TypeVehicle> = {
      name: 'Updated Type Vehicle',
    };

    this.tipoServicio
      .updatePatchTypeVehicle(id, updatedTypeVehicle)
      .subscribe({

        next: (updatedTypeVehicle) => {
          console.log(updatedTypeVehicle);
          alert("ok registro actualizado parcialmente correcatamente")
          this.getAllTypeVehicles();
          this.onCancelarForm();
        },

        error: (e) => {
          alert("hubo un error al actualizar parcialmente en el servidor")
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a updatePatchTypeVehicle')
        },

      })
      
  }

  deleteTypeVehicle(id: number): void {

    this.tipoServicio
      .deleteTypeVehicle(id)
      .subscribe({

        next: () => {
          alert("ok registro eliminado  correcatamente")
          this.cerrarPopUpEliminar();
          this.getAllTypeVehicles();
          
          console.log('Type Vehicle deleted successfully');
        },

        error: (e) => {
          alert("hubo un error al eliminar el registro en el servidor")
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a deleteTypeVehicle')
        },

      })

  }

  // Funciones auxiliares

  // Alinea la ventana en la posicion 0,0 (arriba - evitar el scroll)
  gotoTop() {
    window.scrollTo(0, 0);
  }

}
