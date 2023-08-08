import { Injectable } from '@angular/core';
import { Colores } from '../models/colores';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColoresService {

  private baseUrl: string = environment.url;
  // Replace with your environment variable for the base URL
  
  constructor(private http: HttpClient) {}
  
  getAllColors(): Observable<Colores[]> {
   return this.http.get<Colores[]>(`${this.baseUrl}/api/colores`);
  }
  
  getColorsById(id: number): Observable<Colores> {
   return this.http.get<Colores>(`${this.baseUrl}/api/colores/${id}`);
  }
  
  createColors(colors: Colores): Observable<Colores> {
   return this.http.post<Colores>(`${this.baseUrl}/api/colores`, colors);
  }
  
  updateColors(id: number, colors: Colores): Observable<Colores> {
   return this.http.put<Colores>(`${this.baseUrl}/api/colores/${id}`, colors);
  }
  
  updatePatchColors(id: number, colors: Partial<Colores>): Observable<Colores> {
   return this.http.patch<Colores>(`${this.baseUrl}/api/colores/${id}`, colors);
  }
  
  deleteColors(id: number): Observable<void> {
   return this.http.delete<void>(`${this.baseUrl}/api/colores/${id}`);
  }
  
}
