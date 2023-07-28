import { Injectable } from '@angular/core';
import { Paises } from '../models/paises';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
private baseUrl: string = environment.url;
// Replace with your environment variable for the base URL

constructor(private http: HttpClient) {}

getAllPaises(): Observable<Paises[]> {
 return this.http.get<Paises[]>(`${this.baseUrl}/api/paises`);
}

getPaisesById(id: number): Observable<Paises> {
 return this.http.get<Paises>(`${this.baseUrl}/api/paises/${id}`);
}

createPaises(Paises: Paises): Observable<Paises> {
 return this.http.post<Paises>(`${this.baseUrl}/api/paises`, Paises);
}

updatePaises(id: number, Paises: Paises): Observable<Paises> {
 return this.http.put<Paises>(`${this.baseUrl}/api/paises/${id}`, Paises);
}

updatePatchPaises(id: number, Paises: Partial<Paises>): Observable<Paises> {
 return this.http.patch<Paises>(`${this.baseUrl}/api/paises/${id}`, Paises);
}

deletePaises(id: number): Observable<void> {
 return this.http.delete<void>(`${this.baseUrl}/api/paises/${id}`);
}

}
