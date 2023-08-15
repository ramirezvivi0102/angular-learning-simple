import { Component, OnInit, Inject } from '@angular/core';
import { MarcasService } from '../services/marcas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marcas } from '../models/marcas';
import { Paises } from '../models/paises';

@Component({
  selector: 'app-marcas-editar',
  templateUrl: './marcas-editar.component.html',
  styleUrls: ['./marcas-editar.component.css']
})
export class MarcasEditarComponent implements OnInit {

 
  marcaf: Marcas| undefined;
  titulo = 'Edición de Marcas'
  arregloPaisesPopUp:Paises[]=[];
 
  constructor( 
   private snackBar: MatSnackBar,
   private MarcasService: MarcasService,
   private formBuilder: FormBuilder,
 
     // object para data: recibir desde el componente paises-listado
     // dialogRef controlar el cierre del modal 
     @Inject(MAT_DIALOG_DATA) private data: any,
     private dialogRef: MatDialogRef<MarcasEditarComponent>
     ) {
 
      this.marcaf= data.informacionRegistro;
      this.arregloPaisesPopUp = data.listados.paises;
      this.idRegistro = this.marcaf.id;
      
      this.configurarForm();
 
      if( this.marcaf.id == 0){
       console.log("el registro es nuevo");
 
      }else {
       console.log("el registro es para edicion");
       // inicializar el form que viene del metodo de cada fila (de la tabla)
       this.form.patchValue({
         nombre: this.marcaf.nombre,
         nombreContacto: this.marcaf.nombreContacto,
         telefonoContacto: this.marcaf.telefonoContacto,
         correoContacto: this.marcaf.correoContacto,
        //  pais: this.marcaf.pais.id,

         pais: {
          id: this.marcaf.pais.id,
        },
         

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
       nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)]], //solo letra
       nombreContacto: ['', [Validators.required, Validators.maxLength(50)]],
       telefonoContacto: ['', [Validators.required, Validators.minLength(7), Validators.pattern(/^\+?\d{1,3}-?\d{1,}-?\d{1,}$/)]],
       correoContacto: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]], //correo debe tner @ y .com
       pais: ['', [Validators.required, Validators.maxLength(50)]]
     });
   }
 
   // Se ejecuta cuando se hace clic en el boton submit del formulario
   onSubmitForm(){
     this.submitted = true;
 
     if (this.form.invalid) {
       console.log("Fallo validacion")
       return;
     }
      // esto copia el id del pais y modifica el Json acorde como lo espera el servivio backend
      let idPais = this.form.value.pais;  
      this.form.value.pais = { id: idPais};
      
     console.log("llama createMarcas()")
     this.createMarcas(this.form.value);
   }
 
   onActualizarForm() {
     this.submitted = true;
 
     if (this.form.invalid) {
       console.log("Fallo validacion")
       return;
     }
 
     console.log("llama createPaises()")

     // esto copia el id del pais y modifica el Json acorde como lo espera el servivio backend
     let idPais = this.form.value.pais;  
     this.form.value.pais = { id: idPais};

     this.updateMarcas(this.marcaf.id, this.form.value);
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
 
   createMarcas(newMarcas: Marcas): void {
 
     console.log("Llamando servicio back crear Marcas..")
 
     this.MarcasService
       .createMarcas(newMarcas)
       .subscribe({
 
         next: (createdMarcas) => {
           console.log(createdMarcas);
           this.snackBar.open('Registro creado correcatamente', 'Aceptar', { panelClass: 'app-notification-success', duration: 5000,  });
         },
 
         error: (e) => {
           this.snackBar.open('hubo un error al crear nuevo registro en el servidor', 'Aceptar', { panelClass: 'app-notification-danger', duration: 5000,  });
           console.log("error: al consultar el servicio: " + e);
         },
 
         complete: () =>  {
           console.log('finalizo el llamado a createMarcas')
 
           // cierra el componente modal y envia por parametro (true)
           this.dialogRef.close(true);
         },
 
       });
 
   }
 
   updateMarcas(id: number, updatedMarcas: Marcas): void {
 
     this.MarcasService
       .updateMarcas(id, updatedMarcas)
       .subscribe({
 
         next: (updatedMarcass) => {
           console.log(updatedMarcas);
           this.snackBar.open('Registro actualizado correcatamente', 'Aceptar', { panelClass: 'app-notification-success', duration: 5000,  });
           this.dialogRef.close(true);
         },
 
         error: (e) => {
           this.snackBar.open('Se presento un error al intentar actualizar el registro', 'Aceptar', { panelClass: 'app-notification-danger', duration: 5000,  });
           console.log("error: al consultar el servicio: " + e);
         },
 
         complete: () =>  {
           console.log('finalizo el llamado a updateTipoMarcas')
         },
 
       });
   
   }
 
 
 }
 


