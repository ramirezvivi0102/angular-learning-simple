import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeProducto } from '../models/type-producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
 
export class TipoProductoService {
  private baseUrl: string = environment.url;
   // Replace with your environment variable for the base URL

  constructor(private http: HttpClient) {}

  getAllTypeProducto(): Observable<TypeProducto[]> {
    return this.http.get<TypeProducto[]>(`${this.baseUrl}/api/tipo-productos`);
  }

  getTypeProductoById(id: number): Observable<TypeProducto> {
    return this.http.get<TypeProducto>(`${this.baseUrl}/api/tipo-productos/${id}`);
  }

  createTypeProducto(TypeProducto: TypeProducto): Observable<TypeProducto> {
    return this.http.post<TypeProducto>(`${this.baseUrl}/api/tipo-productos`, TypeProducto);
  }

  updateTypeProducto(id: number, TypeProducto: TypeProducto): Observable<TypeProducto> {
    return this.http.put<TypeProducto>(`${this.baseUrl}/api/tipo-productos/${id}`, TypeProducto);
  }

  updatePatchTypeProducto(id: number, TypeProducto: Partial<TypeProducto>): Observable<TypeProducto> {
    return this.http.patch<TypeProducto>(`${this.baseUrl}/api/tipo-productos/${id}`, TypeProducto);
  }

  deleteTypeProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/tipo-productos/${id}`);
  }

}
