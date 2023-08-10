import { Component } from '@angular/core';
import { ColoresService } from '../services/colors.service';
import { EditarColorsComponent } from '../editar-colors/editar-colors.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Colores } from '../models/colores';
import { EliminarColorsComponent } from '../eliminar-colors/eliminar-colors.component';

@Component({
  selector: 'app-listado-colors',
  templateUrl: './listado-colors.component.html',
  styleUrls: ['./listado-colors.component.scss']
})
export class ListadoColorsComponent {

  colors: Colores[] = [];
  displayStyle = 'none';
  registroSeleccionado: Colores| undefined;

  constructor(
    private colorsService: ColoresService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }
   

  ngOnInit(): void {
    // ...
    this.getAllColors();
  }
  

  mostrarFormularioModificar(color:Colores) {
    const dialogRef: MatDialogRef<EditarColorsComponent> = this.dialog.open(EditarColorsComponent,{
      data:color
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllColors();
      } else if (result === false) {
        
        console.log('Cancelled');
      } else {
        // Handle the dialog being closed without clicking on the buttons (e.g., clicking on the X button)
        console.log('Closed');
      }
    });

  }

  onMostrarFormulario(){

    const dialogRef: MatDialogRef<EditarColorsComponent> = this.dialog.open(EditarColorsComponent,{
      data:{
        id: 0,
        nombre: '',
        rgb: '',
        color: '',
        favorito: '',
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllColors();
      } else if (result === false) {
        
        console.log('Cancelled');
      } else {
        // Handle the dialog being closed without clicking on the buttons (e.g., clicking on the X button)
        console.log('Closed');
      }
    });

  }

  // Acciones de boton eliminar

  abrirPopUpEliminar(color: Colores) {
   
    this.registroSeleccionado = color;

    const dialogRef: MatDialogRef<EliminarColorsComponent> = this.dialog.open(EliminarColorsComponent,{
      data:{
        referencia: color.nombre + ' - ' + color.rgb,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'si') {
        this.eliminar(color.id)
      } else if (result === 'no') {
        
        console.log('Cancelled');
      } 
    });
  }


  // Funciones de acceso al servicio base de datos
  getAllColors(): void {

    this.colorsService
      .getAllColors()
      .subscribe({

        next: (listTipoServicio) => {
          this.colors = listTipoServicio;
          console.log(
            'servicio: colorsService.getAllcolors() trajo ' +
            listTipoServicio.length +
              ' registros'
          );
        },

        error: (e) => {
          this.snackBar.open('hubo un error al cargar el listado en el servidor', 'Aceptar', { panelClass: 'app-notification-error', duration: 5000,  });
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a createColors')
        },

      });

  }

  getColorsById(id: number): void {
    this.colorsService.getColorsById(id).subscribe((colors) => {
      // Handle the retrieved Paises object
      console.log(colors);
    });
  }

  eliminar(id: number): void {
    this.colorsService.deleteColors(id).subscribe({
  
      next: () => {
        console.log();

        this.snackBar.open('Registro eliminado correctamente', 'Aceptar', { panelClass: 'app-notification-success', duration: 5000,  });

        this.getAllColors();
      },

      error: (e) => {
        this.snackBar.open('hubo un error al eliminar registro en el servidor', 'Aceptar', { panelClass: 'app-notification-error', duration: 5000,  });
        console.log("error: al eliminar el servicio: " + e);
      },

      complete: () =>  {
        console.log('finalizo el llamado a deleteColors')
      },

    });
  }
}
