import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlesService {

  private apiUrl = 'http://127.0.0.1:8000/controles';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  getControlesPorRiesgo(riesgoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/riesgo/${riesgoId}`, { headers: this.getHeaders() });
  }

  getTodosControles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  crearControl(control: any): Observable<any> {
    return this.http.post(this.apiUrl, control, { headers: this.getHeaders() });
  }

  actualizarControl(id: number, control: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, control, { headers: this.getHeaders() });
  }

  eliminarControl(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
