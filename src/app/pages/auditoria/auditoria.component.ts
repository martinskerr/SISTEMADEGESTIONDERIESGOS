import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditoriaService } from '../../core/auditoria.service';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auditoria.component.html'
})
export class AuditoriaComponent implements OnInit {

  registros: any[] = [];
  registrosFiltrados: any[] = [];
  objectKeys(obj: any): string[] {
  return obj ? Object.keys(obj) : [];
}
  // Filtros
  filtroEntidad: string = '';
  filtroAccion: string = '';
  filtroUsuario: string = '';
  busqueda: string = '';

  entidades = ['Riesgo', 'Incidente', 'Control', 'Usuario'];
  acciones = ['CREAR', 'ACTUALIZAR', 'ELIMINAR'];

  cargando = false;
  error = '';
  
  // Para ver detalles
  registroSeleccionado: any = null;
  mostrarDetalle = false;

  constructor(private auditoriaService: AuditoriaService) {}

  ngOnInit(): void {
    this.cargarAuditoria();
  }

  cargarAuditoria() {
    this.cargando = true;
    this.auditoriaService.getAuditoria(200).subscribe({
      next: (data) => {
        this.registros = data;
        this.registrosFiltrados = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar auditoría';
        this.cargando = false;
      }
    });
  }

  aplicarFiltros() {
    let resultado = [...this.registros];

    // Búsqueda por texto
    if (this.busqueda.trim()) {
      const termino = this.busqueda.toLowerCase();
      resultado = resultado.filter(r => 
        r.descripcion.toLowerCase().includes(termino) ||
        r.usuario_nombre.toLowerCase().includes(termino)
      );
    }

    // Filtro por entidad
    if (this.filtroEntidad) {
      resultado = resultado.filter(r => r.entidad === this.filtroEntidad);
    }

    // Filtro por acción
    if (this.filtroAccion) {
      resultado = resultado.filter(r => r.accion === this.filtroAccion);
    }

    // Filtro por usuario
    if (this.filtroUsuario.trim()) {
      const termino = this.filtroUsuario.toLowerCase();
      resultado = resultado.filter(r => 
        r.usuario_nombre.toLowerCase().includes(termino)
      );
    }

    this.registrosFiltrados = resultado;
  }

  limpiarFiltros() {
    this.busqueda = '';
    this.filtroEntidad = '';
    this.filtroAccion = '';
    this.filtroUsuario = '';
    this.registrosFiltrados = [...this.registros];
  }

  verDetalle(registro: any) {
    this.registroSeleccionado = registro;
    this.mostrarDetalle = true;
  }

  cerrarDetalle() {
    this.mostrarDetalle = false;
    this.registroSeleccionado = null;
  }

  getAccionColor(accion: string): string {
    if (accion === 'CREAR') return '#28a745';
    if (accion === 'ACTUALIZAR') return '#ffc107';
    if (accion === 'ELIMINAR') return '#dc3545';
    return '#6c757d';
  }

  getEntidadIcon(entidad: string): string {
    if (entidad === 'Riesgo') return '⚠️';
    if (entidad === 'Incidente') return '🚨';
    if (entidad === 'Control') return '🛡️';
    if (entidad === 'Usuario') return '👤';
    return '📋';
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
