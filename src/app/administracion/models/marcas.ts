import { Paises } from "./paises";

export interface Marcas {
    id: number;
    nombre: string;
    nombreContacto: string;
	  telefonoContacto:number;
	  correoContacto: string;
      pais: Paises
  }