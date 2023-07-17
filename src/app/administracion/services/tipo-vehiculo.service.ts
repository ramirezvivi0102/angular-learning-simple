import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeVehicle } from '../models/type-vehiculo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {
  private baseUrl: string = environment.url; // Replace with your environment variable for the base URL

  constructor(private http: HttpClient) {}

  getAllTypeVehicles(): Observable<TypeVehicle[]> {
    return this.http.get<TypeVehicle[]>(`${this.baseUrl}/type-vehicles`);
  }

  getTypeVehicleById(id: number): Observable<TypeVehicle> {
    return this.http.get<TypeVehicle>(`${this.baseUrl}/type-vehicles/${id}`);
  }

  createTypeVehicle(typeVehicle: TypeVehicle): Observable<TypeVehicle> {
    return this.http.post<TypeVehicle>(`${this.baseUrl}/type-vehicles`, typeVehicle);
  }

  updateTypeVehicle(id: number, typeVehicle: TypeVehicle): Observable<TypeVehicle> {
    return this.http.put<TypeVehicle>(`${this.baseUrl}/type-vehicles/${id}`, typeVehicle);
  }

  updatePatchTypeVehicle(id: number, typeVehicle: Partial<TypeVehicle>): Observable<TypeVehicle> {
    return this.http.patch<TypeVehicle>(`${this.baseUrl}/type-vehicles/${id}`, typeVehicle);
  }

  deleteTypeVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/type-vehicles/${id}`);
  }
}
