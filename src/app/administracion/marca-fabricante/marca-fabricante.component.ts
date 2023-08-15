import { Component, OnInit } from '@angular/core';
import { MarcasService } from '../services/marcas.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcas } from '../models/marcas';
import { MarcasEditarComponent } from '../marcas-editar/marcas-editar.component';
import { DialogoEliminarComponent } from '../dialogo-eliminar/dialogo-eliminar.component';
import { PaisesService } from '../services/paises.service';
import { Paises } from '../models/paises';


@Component({
  selector: 'app-marca-fabricante',
  templateUrl: './marca-fabricante.component.html',
  styleUrls: ['./marca-fabricante.component.scss']
})
export class MarcaFabricanteComponent implements OnInit{
  marcas:Marcas[] = [];
  paises:Paises[]=[];
  displayStyle = 'none';
  registroSeleccionado: Marcas| undefined;

  constructor(
    private MarcasService: MarcasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private paisesService: PaisesService

  ) {

  }
   

  ngOnInit(): void {
    // ...
    this.getAllMarcas();
    this.getAllPaises();
  }

   // Funciones de acceso al servicio base de datos
   
  mostrarFormularioModificar(marcaf: Marcas) {
    let todaData = {
      informacionRegistro: marcaf,
      listados: {
        paises: this.paises
      }
    }
    const dialogRef: MatDialogRef<MarcasEditarComponent> = this.dialog.open(MarcasEditarComponent,{
      data:todaData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllMarcas();
      
      } else if (result === false) {
        
        console.log('Cancelled');
      } else {
        // Handle the dialog being closed without clicking on the buttons (e.g., clicking on the X button)
        console.log('Closed');
      }
    });

  }

  onMostrarFormulario(){

    const dialogRef: MatDialogRef<MarcasEditarComponent> = this.dialog.open(
      MarcasEditarComponent,
      {
        data: {
          id: 0,
          nombre: '',
          nombreContacto: '',
          telefonoContacto: '',
          correoContacto: '',
          pais: {
            id: '',
            nombre: '',
            sigla: '',
          },
        },
      });

    dialogRef.afterClosed().subscribe((result) => {
    
      if (result === true) {
        this.getAllMarcas();
     
      } else if (result === false) {
        
        console.log('Cancelled');
      } else {
        // Handle the dialog being closed without clicking on the buttons (e.g., clicking on the X button)
        console.log('Closed');
      }
    });

  }

  getAllPaises(): void {

    this.paisesService
      .getAllPaises()
      .subscribe({

        next: (paisesLleganDelServicio) => {
          this.paises = paisesLleganDelServicio;
          console.log(
            'servicio: paisesService.getAllPaises() trajo ' +
            paisesLleganDelServicio.length +
              ' registros'
          );
        },

        error: (e) => {
          this.snackBar.open('hubo un error al cargar el listado de paises en el servidor', 'Aceptar', { panelClass: 'app-notification-error', duration: 5000,  });
          console.log("error: al consultar el servicio: " + e);
        },

        complete: () =>  {
          console.log('finalizo el llamado a createPaises')
        },

      });

  }
  // Acciones de boton eliminar

  abrirPopUpEliminar(marcasf:Marcas) {
   
    this.registroSeleccionado = marcasf;

    const dialogRef: MatDialogRef<DialogoEliminarComponent> = this.dialog.open(DialogoEliminarComponent,{
      data:{
        entidad: 'marca fabricante',
        referencia: marcasf.nombre + ', Contacto: ' + marcasf.nombreContacto+ ' de (' +
         +marcasf.pais.nombre + ') '
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'si') {
        this.eliminar(marcasf.id)
      } else if (result === 'no') {
        
        console.log('Cancelled');
      } 
    });
  }


  // Funciones de acceso al servicio base de datos
  getAllMarcas(): void {

    this.MarcasService
      .getAllMarcas()
      .subscribe({
        
        next: (listTipoServicio) => {
          this.marcas = listTipoServicio;
          console.log(
            'servicio: marcasService.getAllMarcas() trajo ' +
            listTipoServicio.length +
              ' registros'
          );
        },

        error: (e) => {
          this.snackBar.open('hubo un error al cargar el listado de marcas fabricantes', 'Aceptar', { panelClass: 'app-notification-error', duration: 5000,  });
          console.log("error: al consultar el servicio: " + JSON.stringify(e) );
        },
        complete: () =>  {
          console.log('finalizo el llamado a createMarcas')
        },

      });

  }

  getMarcasById(id: number): void {
    this.MarcasService.getMarcasById(id).subscribe((Marcasf) => {
      // Handle the retrieved Paises object
      console.log(Marcasf);
    });
  }

  eliminar(id: number): void {
    this.MarcasService.deleteMarcas(id).subscribe({
  
      next: () => {
        console.log();

        this.snackBar.open('Registro eliminado correctamente', 'Aceptar', { panelClass: 'app-notification-success', duration: 5000,  });

        this.getAllMarcas();
      },

      error: (e) => {
        this.snackBar.open('hubo un error al eliminar registro en el servidor', 'Aceptar', { panelClass: 'app-notification-error', duration: 5000,  });
        console.log("error: al eliminar el servicio: " + e);
      },

      complete: () =>  {
        console.log('finalizo el llamado a deleteMarcas')
      },

    });
  }
  // Funciones

}
