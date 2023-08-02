import { Component, OnInit } from '@angular/core';
import { TipoProductoService } from '../services/tipo-producto.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TypeProducto } from '../models/type-producto';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.scss']
})

export class TipoProductoComponent implements OnInit{
  
    typeProducto: TypeProducto[] = [];
  
    displayStyle = 'none';
  
    enEdicion = false;
    submitted: boolean = false;
    idRegistro: number = 0;
    form: FormGroup;
    registroSeleccionado: TypeProducto | undefined;
  
    constructor(
      private snackBar: MatSnackBar,
      private tipoServicio: TipoProductoService,
      private formBuilder: FormBuilder
    ) 
    {}
     
  
    ngOnInit(): void {
      // ...
      this.getAllTypeProducto();
      this.configurarForm();
    }

    configurarForm() {
      this.form = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.maxLength(50)]],
        
      });
    }
  
    onActualizarForm(){
  
      this.submitted = true;
  
      if (this.form.invalid) {
        console.log("Fallo validacion")
        return;
      }
  
      console.log("llama updateTypeProducto()")
      this.updateTypeProducto(this.idRegistro, this.form.value);
    }
  
    // Se ejecuta cuando se hace clic en el boton submit del formulario
    onSubmitForm(){
  
      this.submitted = true;
  
      if (this.form.invalid) {
        console.log("Fallo validacion")
        return;
      }
  
      console.log("llama createTypeProducto()")
      this.createTypeProducto(this.form.value);
    }
  
    onResetForm(){
      this.form.reset();
    }
  
    mostrarFormularioModificar(TypeProducto: TypeProducto) {
      this.enEdicion = true;
      this.idRegistro = TypeProducto.id;
      this.form.patchValue({
        nombre: TypeProducto.nombre,
       
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
  
    abrirPopUpEliminar(TypeProducto: TypeProducto) {
      this.displayStyle = 'block';
      this.registroSeleccionado = TypeProducto;
    }
  
    cerrarPopUpEliminar() {
      this.displayStyle = 'none';
    }
  
    // Funciones de acceso al servicio base de datos
    getAllTypeProducto(): void {
  
      this.tipoServicio
        .getAllTypeProducto()
        .subscribe({
  
          next: (listTipoServicio) => {
            this.typeProducto = listTipoServicio;
            console.log(
              'servicio: tipoServicio.getAllTypeProducto() trajo ' +
              listTipoServicio.length +
                ' registros'
            );
          },
  
          error: (e) => {
            alert("hubo un error al cargar el listado en el servidor")
            console.log("error: al consultar el servicio: " + e);
          },
  
          complete: () =>  {
            console.log('finalizo el llamado a createTypeProducto')
          },
  
        });
  
    }
  
    getTypeProductoById(id: number): void {
      this.tipoServicio.getTypeProductoById(id).subscribe((TypeProducto) => {
        // Handle the retrieved TypeProducto object
        console.log(TypeProducto);
      });
    }
  
    createTypeProducto(newTypeProducto: TypeProducto): void {
  
      console.log("Llamando servicio back crear TipoProducto..")
  
      this.tipoServicio
        .createTypeProducto(newTypeProducto)
        .subscribe({
  
          next: (createdTypeProducto) => {
            console.log(createdTypeProducto);

            this.snackBar.open('Registro creado correctamente', 'Aceptar', { panelClass: 'app-notification-success', duration: 5000,  });

            this.getAllTypeProducto();
            this.onCancelarForm();
          },
  
          error: (e) => {
            this.snackBar.open('hubo un error al crear nuevo registro en el servidor', 'Aceptar', { panelClass: 'app-notification-error', duration: 5000,  });
            console.log("error: al consultar el servicio: " + e);
          },
  
          complete: () =>  {
            console.log('finalizo el llamado a createTypeProducto')
          },
  
        });
  
    }
  
    updateTypeProducto(id: number, updatedTypeProducto: TypeProducto): void {
  
      this.tipoServicio
        .updateTypeProducto(id, updatedTypeProducto)
        .subscribe({
  
          next: (updatedTypeProducto) => {
            console.log(updatedTypeProducto);
            this.snackBar.open('Registro actualizado correctamente', 'Aceptar', { panelClass: 'app-notification-success', duration: 5000,  });
            this.getAllTypeProducto();
            this.onCancelarForm();
          },
  
          error: (e) => {
            this.snackBar.open('hubo un error actualizando registro en el servidor', 'Aceptar', { panelClass: 'app-notification-error', duration: 5000,  });
            console.log("error: al consultar el servicio: " + e);
          },
  
          complete: () =>  {
            console.log('finalizo el llamado a updateTipoVEHICULO')
          },
  
        });
    
    }

  
    deleteTypeProducto(id: number): void {
  
      this.tipoServicio
        .deleteTypeProducto(id)
        .subscribe({
  
          next: () => {
            this.snackBar.open('Registro eliminado correctamente', 'Aceptar', { panelClass: 'app-notification-success', duration: 5000,  });
            this.cerrarPopUpEliminar();
            this.getAllTypeProducto();
            
            console.log('Type Producto deleted successfully');
          },
  
          error: (e) => {
            this.snackBar.open('hubo un error al eliminar registro en el servidor', 'Aceptar', { panelClass: 'app-notification-error', duration: 5000,  });
            console.log("error: al consultar el servicio: " + e);
          },
  
          complete: () =>  {
            console.log('finalizo el llamado a deleteTypeProducto')
          },
  
        })
  
    }
  
    // Funciones auxiliares
  
    // Alinea la ventana en la posicion 0,0 (arriba - evitar el scroll)
    gotoTop() {
      window.scrollTo(0, 0);
    }
  
  }
  
