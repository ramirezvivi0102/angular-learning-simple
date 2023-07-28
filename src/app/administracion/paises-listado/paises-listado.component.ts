import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paises } from '../models/paises';
import { PaisesService } from '../services/paises.service';

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
    private snackBar: MatSnackBar,
    private paisesService: PaisesService,
    private formBuilder: FormBuilder
  ) 
  {}
   

  ngOnInit(): void {
    // ...
    this.getAllPaises();
  }

  mostrarFormularioModificar(paises: Paises) {
    
  }

  onMostrarFormulario(){

  }

  // Acciones de boton eliminar

  abrirPopUpEliminar(Paises: Paises) {
    this.displayStyle = 'block';
    this.registroSeleccionado = Paises;
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


  // Funciones auxiliares
}

