import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaisesService } from '../services/paises.service';

@Component({
  selector: 'app-dialogo-eliminar',
  templateUrl: './dialogo-eliminar.component.html',
  styleUrls: ['./dialogo-eliminar.component.scss']
})
export class DialogoEliminarComponent {
  titulo: string = 'Confirme la acción';
  entidad: string
  referencia: string;

  constructor( 
      @Inject(MAT_DIALOG_DATA) private data: any,
      private dialogRef: MatDialogRef<DialogoEliminarComponent>
      ){
       this.entidad = data.entidad;
       this.referencia = data.referencia;
       
    }

    onCancelar(){
      this.dialogRef.close("no");
    }

    onConfirmar(){
      this.dialogRef.close("si");
    }

}
