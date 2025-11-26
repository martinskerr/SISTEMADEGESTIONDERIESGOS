import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RiesgosService } from '../../core/riesgos.service';

@Component({
  selector: 'app-riesgos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './riesgos.component.html'
})
export class RiesgosComponent implements OnInit {

  riesgos: any[] = [];
  cargando = false;
  error = '';




  constructor(private riesgosService: RiesgosService) {}

  ngOnInit(): void {
    this.cargarRiesgos();
  }

  cargarRiesgos() {
    this.cargando = true;
    this.error = '';

    this.riesgosService.getRiesgos().subscribe({
      next: (data: any) => {
        this.riesgos = Array.isArray(data) ? data : [];
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No fue posible cargar los riesgos.';
        this.cargando = false;
      }
    });
  }

  getNivelColor(nivel: number): string {
    if (nivel >= 15) return 'red';
    if (nivel >= 10) return 'orange';
    if (nivel >= 5) return 'gold';
    return 'green';
  }

  getNivelClase(nivel: number): string {
    if (nivel >= 20) return 'nivel-critico';
    if (nivel >= 15) return 'nivel-alto';
    if (nivel >= 8) return 'nivel-medio';
    return 'nivel-bajo';
  } 

  getEstadoClase(estado: string): string {
    const estadoLower = estado.toLowerCase().replace(/\s/g, '-');
    return `estado-${estadoLower}`;
  }

  getNivelBgColor(nivel: number): string {
  if (nivel >= 20) return '#dc3545';
  if (nivel >= 15) return '#fd7e14';
  if (nivel >= 8) return '#ffc107';
  return '#28a745';
}

getNivelTextColor(nivel: number): string {
  if (nivel >= 8) return 'white';
  return '#333';
}

getEstadoBgColor(estado: string): string {
  const map: any = {
    'Identificado': '#e3f2fd',
    'En Evaluación': '#fff3e0',
    'Crítico': '#ffebee',
    'En Mitigación': '#e8f5e9',
    'Controlado': '#f3e5f5'
  };
  return map[estado] || '#f8f9fa';
}

getEstadoTextColor(estado: string): string {
  const map: any = {
    'Identificado': '#1976d2',
    'En Evaluación': '#f57c00',
    'Crítico': '#c62828',
    'En Mitigación': '#2e7d32',
    'Controlado': '#7b1fa2'
  };
  return map[estado] || '#333';
}

  eliminarRiesgo(id: number, titulo: string) {
    if (confirm(`¿Estás seguro de eliminar el riesgo "${titulo}"?`)) {
      this.riesgosService.eliminarRiesgo(id).subscribe({
        next: () => {
          alert('Riesgo eliminado exitosamente');
          this.cargarRiesgos(); // Recargar lista
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar el riesgo');
        }
      });
    }
  }
}
