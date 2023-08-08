import { Component, Inject } from '@angular/core';
import { Colores } from '../models/colores';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColoresService } from '../services/colors.service';


@Component({
  selector: 'app-editar-colors',
  templateUrl: './editar-colors.component.html',
  styleUrls: ['./editar-colors.component.scss']
})
export class EditarColorsComponent {
  
 colors: Colores| undefined;
 titulo = 'Edición de Colores'

 constructor( 
  private snackBar: MatSnackBar,
  private ColorsService: ColoresService,
    private formBuilder: FormBuilder,

    // object para data: recibir desde el componente paises-listado
    // dialogRef controlar el cierre del modal 
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditarColorsComponent>

    ){

     this.colors = data;
     this.idRegistro = this.colors.id;
     
     this.configurarForm();

     if( this.colors.id == 0){
      console.log("el registro es nuevo");

     }else {
      console.log("el registro es para edicion");
      // inicializar el form que viene del metodo de cada fila (de la tabla)
      this.form.patchValue({
        nombre: this.colors.nombre,
        rgb: this.colors.rgb,
        favorito: this.colors.favorito
      });
     }
     
  }


  displayStyle = 'none';

  enEdicion = false;
  form: FormGroup;
  submitted: boolean = false;

  idRegistro: number = 0;

  ngOnInit(): void {
    // ...
    
  }

  configurarForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      rgb: ['', [Validators.required, Validators.maxLength(4)]]
    });
  }

  // Se ejecuta cuando se hace clic en el boton submit del formulario
  onSubmitForm(){
    this.submitted = true;

    if (this.form.invalid) {
      console.log("Fallo validacion")
      return;
    }

    console.log("llama createcolors()")
    this.createColors(this.form.value);
  }

  onActualizarForm() {
    this.submitted = true;

    if (this.form.invalid) {
      console.log("Fallo validacion")
      return;
    }

    console.log("llama createcolors()")
    this.updateColors(this.colors.id, this.form.value);
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

  createColors(newcolors: Colores): void {

    console.log("Llamando servicio back crear Paises..")

    this.ColorsService
      .createColors(newcolors)
      .subscribe({

        next: (createColors) => {
          console.log(createColors);

          // ejemplo de devolver (luego de cerrar el modal)
          //  al componente que lo llamo (paises-listar) el resultado
          // del registro creado
          // this.dialogRef.close(createdPaises);
          this.snackBar.open('Registro creado correcatamente', 'Aceptar', { panelClass: 'app-notification-success', duration: 5000,  });
        },

        error: (e) => {
          this.snackBar.open('hubo un error al crear nuevo registro en el servidor', 'Aceptar', { panelClass: 'app-notification-danger', duration: 5000,  });
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a createPaises')

          // cierra el componente modal y envia por parametro (true)
          this.dialogRef.close(true);
        },

      });

  }


 // Color inicial: negro
  updateColors(id: number, updateColors: Colores): void {

    this.ColorsService
    .updateColors(id, updateColors)
      .subscribe({

        next: (updateColors) => {
          console.log(updateColors);
          this.snackBar.open('Registro actualizado correcatamente', 'Aceptar', { panelClass: 'app-notification-success', duration: 5000,  });
          this.dialogRef.close(true);
        },

        error: (e) => {
          this.snackBar.open('Se presento un error al intentar actualizar el registro', 'Aceptar', { panelClass: 'app-notification-danger', duration: 5000,  });
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a updateTipoVEHICULO')
        },

      });
  
  }



}
