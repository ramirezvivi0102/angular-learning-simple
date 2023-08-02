import { Component, Inject } from '@angular/core';
import { Paises } from '../models/paises';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../services/paises.service';

@Component({
  selector: 'app-paises-editar',
  templateUrl: './paises-editar.component.html',
  styleUrls: ['./paises-editar.component.scss']
})
export class PaisesEditarComponent {

 pais: Paises| undefined;
 titulo = 'Edición de paises'

 constructor( 
  private paisesServicio: PaisesService,
    private formBuilder: FormBuilder,

    // object para data: recibir desde el componente paises-listado
    // dialogRef controlar el cierre del modal 
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PaisesEditarComponent>

    ){
     this.pais = data;
     if( this.pais.id == 0){
      console.log("el registro es nuevo");
     }else {
      console.log("el registro es para edicion");
     }
     this.configurarForm();
  }


  displayStyle = 'none';

  enEdicion = false;
  form: FormGroup;
  form2: FormGroup;
  submitted: boolean = false;

  idRegistro: number = 0;

  ngOnInit(): void {
    // ...
    
  }

  configurarForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      sigla: ['', [Validators.required, Validators.maxLength(4)]]
    });
  }

  // Se ejecuta cuando se hace clic en el boton submit del formulario
  onSubmitForm(){
debugger;
    this.submitted = true;

    if (this.form.invalid) {
      console.log("Fallo validacion")
      return;
    }

    console.log("llama createPaises()")
    this.createPaises(this.form.value);
  }

  onActualizarForm() {
    this.submitted = true;

    if (this.form.invalid) {
      console.log("Fallo validacion")
      return;
    }

    console.log("llama createPaises()")
    this.updatePaises(this.pais.id, this.form.value);
  }

  onResetForm(){
    this.form.reset();
  }

  onMostrarFormulario(){
    this.idRegistro = 0;
    this.enEdicion = true;
  }

  onCancelarForm(){
    this.dialogRef.close();
  }

  itemForm(formItem): any {
    return this.form.controls[formItem];
  }

  createPaises(newPaises: Paises): void {

    console.log("Llamando servicio back crear Paises..")

    this.paisesServicio
      .createPaises(newPaises)
      .subscribe({

        next: (createdPaises) => {
          console.log(createdPaises);

          // ejemplo de devolver (luego de cerrar el modal)
          //  al componente que lo llamo (paises-listar) el resultado
          // del registro creado
          // this.dialogRef.close(createdPaises);

          alert("ok registro creado correcatamente")
        },

        error: (e) => {
          alert("hubo un error al crear nuevo registro en el servidor")
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a createPaises')

          // cierra el componente modal y envia por parametro (true)
          this.dialogRef.close(true);
        },

      });

  }

  updatePaises(id: number, updatedPaises: Paises): void {

    this.paisesServicio
      .updatePaises(id, updatedPaises)
      .subscribe({

        next: (updatedPaises) => {
          console.log(updatedPaises);
          alert("ok registro actualizado correcatamente")
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


}
