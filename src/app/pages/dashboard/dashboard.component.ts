import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiesgosService } from '../../core/riesgos.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  estadisticas = {
    totalRiesgos: 0,
    riesgosCriticos: 0,
    riesgosAltos: 0,
    riesgosMedios: 0,
    riesgosBajos: 0
  };

  riesgosPorCategoria: any[] = [];
  cargando = true;

  constructor(private riesgosService: RiesgosService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.riesgosService.getRiesgos().subscribe({
      next: (riesgos) => {
        this.estadisticas.totalRiesgos = riesgos.length;
        
        // Contar por nivel de riesgo
        this.estadisticas.riesgosCriticos = riesgos.filter(r => r.nivel_riesgo >= 20).length;
        this.estadisticas.riesgosAltos = riesgos.filter(r => r.nivel_riesgo >= 15 && r.nivel_riesgo < 20).length;
        this.estadisticas.riesgosMedios = riesgos.filter(r => r.nivel_riesgo >= 8 && r.nivel_riesgo < 15).length;
        this.estadisticas.riesgosBajos = riesgos.filter(r => r.nivel_riesgo < 8).length;

        // Agrupar por categoría
        const categorias = riesgos.reduce((acc: any, r: any) => {
          acc[r.categoria] = (acc[r.categoria] || 0) + 1;
          return acc;
        }, {});

        this.riesgosPorCategoria = Object.keys(categorias).map(key => ({
          nombre: key,
          cantidad: categorias[key]
        }));

        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas', err);
        this.cargando = false;
      }
    });
  }
}
