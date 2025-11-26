import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Riesgo } from './models/riesgo.model';

@Injectable({
  providedIn: 'root'
})
export class RiesgosService {

  private apiUrl = 'http://127.0.0.1:8000/riesgos';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    
    // Verificar si estamos en el navegador
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    
    return headers;
  }

  getRiesgos(): Observable<Riesgo[]> {
    return this.http.get<Riesgo[]>(this.apiUrl, { 
      headers: this.getHeaders() 
    });
  }

  crearRiesgo(riesgo: any): Observable<any> {
    return this.http.post(this.apiUrl, riesgo, { 
      headers: this.getHeaders() 
    });
  }

  actualizarRiesgo(id: number, riesgo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, riesgo, { 
      headers: this.getHeaders() 
    });
  }

  eliminarRiesgo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { 
      headers: this.getHeaders() 
    });
  }
}
