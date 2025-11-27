import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  private apiUrl = 'http://127.0.0.1:8000/auditoria';

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

  getAuditoria(limit: number = 100, entidad?: string, usuarioId?: number): Observable<any[]> {
    let url = `${this.apiUrl}?limit=${limit}`;
    if (entidad) url += `&entidad=${entidad}`;
    if (usuarioId) url += `&usuario_id=${usuarioId}`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }

  getAuditoriaEntidad(entidad: string, entidadId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entidad/${entidad}/${entidadId}`, { headers: this.getHeaders() });
  }
}
