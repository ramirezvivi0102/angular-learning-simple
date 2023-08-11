import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Marcas } from '../models/marcas';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  private baseUrl: string = environment.url;
  // Replace with your environment variable for the base URL
  
  constructor(private http: HttpClient) {}

  getAllMarcas(): Observable<Marcas[]> {
   return this.http.get<Marcas[]>(`${this.baseUrl}/marca-fabricante`);
  }
  
  getMarcasById(id: number): Observable<Marcas> {
   return this.http.get<Marcas>(`${this.baseUrl}/marca-fabricante/${id}`);
  }
  
  createMarcas(Marcas: Marcas): Observable<Marcas> {
   return this.http.post<Marcas>(`${this.baseUrl}/marca-fabricante`, Marcas);
  }
  
  updateMarcas(id: number, Marcas: Marcas): Observable<Marcas> {
   return this.http.put<Marcas>(`${this.baseUrl}/marca-fabricante/${id}`, Marcas);
  }
  
  updatePatchMarcas(id: number, Marcas: Partial<Marcas>): Observable<Marcas> {
   return this.http.patch<Marcas>(`${this.baseUrl}/marca-fabricante/${id}`, Marcas);
  }
  
  deleteMarcas(id: number): Observable<void> {
   return this.http.delete<void>(`${this.baseUrl}/marca-fabricante/${id}`);
  }
  

}
