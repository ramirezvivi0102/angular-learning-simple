import { Component, OnInit } from '@angular/core';
import { Paises } from '../models/paises';
import { PaisesService } from '../services/paises.service';
import { PaisesEditarComponent } from '../paises-editar/paises-editar.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogoEliminarComponent } from '../dialogo-eliminar/dialogo-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-paises-listado',
  templateUrl: './paises-listado.component.html',
  styleUrls: ['./paises-listado.component.scss']
})
export class PaisesListadoComponent  implements OnInit{
  
  paises: Paises[] = [];
  displayStyle = 'none';
  registroSeleccionado: Paises | undefined;

  constructor(
    private paisesService: PaisesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }
   

  ngOnInit(): void {
    // ...
    this.getAllPaises();
  }

  mostrarFormularioModificar(pais: Paises) {
    const dialogRef: MatDialogRef<PaisesEditarComponent> = this.dialog.open(PaisesEditarComponent,{
      data:pais
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllPaises();
      } else if (result === false) {
        
        console.log('Cancelled');
      } else {
        // Handle the dialog being closed without clicking on the buttons (e.g., clicking on the X button)
        console.log('Closed');
      }
    });

  }

  onMostrarFormulario(){

    const dialogRef: MatDialogRef<PaisesEditarComponent> = this.dialog.open(PaisesEditarComponent,{
      data:{
        id: 0,
        nombre: '',
        sigla: ''
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllPaises();
      } else if (result === false) {
        
        console.log('Cancelled');
      } else {
        // Handle the dialog being closed without clicking on the buttons (e.g., clicking on the X button)
        console.log('Closed');
      }
    });

  }

  // Acciones de boton eliminar

  abrirPopUpEliminar(pais: Paises) {
   
    this.registroSeleccionado = pais;

    const dialogRef: MatDialogRef<DialogoEliminarComponent> = this.dialog.open(DialogoEliminarComponent,{
      data:{
        entidad: 'Pais',
        referencia: pais.nombre + ' - ' + pais.sigla
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'si') {
        this.eliminar(pais.id)
      } else if (result === 'no') {
        
        console.log('Cancelled');
      } 
    });
  }


  // Funciones de acceso al servicio base de datos
  getAllPaises(): void {

    this.paisesService
      .getAllPaises()
      .subscribe({

        next: (listTipoServicio) => {
          this.paises = listTipoServicio;
          console.log(
            'servicio: paisesService.getAllPaises() trajo ' +
            listTipoServicio.length +
              ' registros'
          );
        },

        error: (e) => {
          alert("hubo un error al cargar el listado en el servidor")
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a createPaises')
        },

      });

  }

  getPaisesById(id: number): void {
    this.paisesService.getPaisesById(id).subscribe((Paises) => {
      // Handle the retrieved Paises object
      console.log(Paises);
    });
  }

  eliminar(id: number): void {
    this.paisesService.deletePaises(id).subscribe({
  
      next: () => {
        console.log();

        this.snackBar.open('Registro eliminado correctamente', 'Aceptar', { panelClass: 'app-notification-success', duration: 5000,  });

        this.getAllPaises();
      },

      error: (e) => {
        this.snackBar.open('hubo un error al eliminar registro en el servidor', 'Aceptar', { panelClass: 'app-notification-error', duration: 5000,  });
        console.log("error: al eliminar el servicio: " + e);
      },

      complete: () =>  {
        console.log('finalizo el llamado a deletePaises')
      },

    });
  }
  // Funciones auxiliares
}

