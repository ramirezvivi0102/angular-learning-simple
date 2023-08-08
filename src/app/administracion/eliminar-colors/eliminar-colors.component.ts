import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Colores } from '../models/colores';

@Component({
  selector: 'app-eliminar-colors',
  templateUrl: './eliminar-colors.component.html',
  styleUrls: ['./eliminar-colors.component.scss']
})
export class EliminarColorsComponent {
  titulo: string = 'Confirme la acción';
  entidad: string
  referencia: string;

  constructor( 
      @Inject(MAT_DIALOG_DATA) private data: any,
      private dialogRef: MatDialogRef<EliminarColorsComponent>
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
