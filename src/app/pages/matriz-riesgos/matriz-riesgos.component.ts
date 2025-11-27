import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiesgosService } from '../../core/riesgos.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-matriz-riesgos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matriz-riesgos.component.html'
})
export class MatrizRiesgosComponent implements OnInit {

  @ViewChild('matrizCanvas', { static: false }) matrizCanvas!: ElementRef<HTMLCanvasElement>;

  riesgos: any[] = [];
  cargando = false;
  chart: any;

  // Contadores por cuadrante
  bajoBajo = 0;      // Verde
  bajoAlto = 0;      // Amarillo
  altoBajo = 0;      // Amarillo
  altoAlto = 0;      // Rojo

  constructor(private riesgosService: RiesgosService) {}

  ngOnInit(): void {
    this.cargarRiesgos();
  }

  cargarRiesgos() {
    this.cargando = true;
    this.riesgosService.getRiesgos().subscribe({
      next: (data) => {
        this.riesgos = data;
        this.calcularCuadrantes();
        this.cargando = false;
        setTimeout(() => this.crearMatriz(), 100);
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  calcularCuadrantes() {
    this.bajoBajo = this.riesgos.filter(r => r.probabilidad <= 3 && r.impacto <= 3).length;
    this.bajoAlto = this.riesgos.filter(r => r.probabilidad <= 3 && r.impacto > 3).length;
    this.altoBajo = this.riesgos.filter(r => r.probabilidad > 3 && r.impacto <= 3).length;
    this.altoAlto = this.riesgos.filter(r => r.probabilidad > 3 && r.impacto > 3).length;
  }

  crearMatriz() {
    if (!this.matrizCanvas) return;

    const ctx = this.matrizCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Preparar datos para el gráfico de dispersión
    const datasets = [
      {
        label: 'Riesgos Bajos',
        data: this.riesgos
          .filter(r => r.nivel_riesgo < 8)
          .map(r => ({ x: r.probabilidad, y: r.impacto, titulo: r.titulo })),
        backgroundColor: '#28a745',
        borderColor: '#1e7e34',
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 12
      },
      {
        label: 'Riesgos Medios',
        data: this.riesgos
          .filter(r => r.nivel_riesgo >= 8 && r.nivel_riesgo < 15)
          .map(r => ({ x: r.probabilidad, y: r.impacto, titulo: r.titulo })),
        backgroundColor: '#ffc107',
        borderColor: '#e0a800',
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 12
      },
      {
        label: 'Riesgos Altos',
        data: this.riesgos
          .filter(r => r.nivel_riesgo >= 15 && r.nivel_riesgo < 20)
          .map(r => ({ x: r.probabilidad, y: r.impacto, titulo: r.titulo })),
        backgroundColor: '#fd7e14',
        borderColor: '#d86300',
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 12
      },
      {
        label: 'Riesgos Críticos',
        data: this.riesgos
          .filter(r => r.nivel_riesgo >= 20)
          .map(r => ({ x: r.probabilidad, y: r.impacto, titulo: r.titulo })),
        backgroundColor: '#dc3545',
        borderColor: '#bd2130',
        borderWidth: 2,
        pointRadius: 10,
        pointHoverRadius: 14
      }
    ];

    const config: ChartConfiguration = {
      type: 'scatter',
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Matriz de Riesgos: Probabilidad vs Impacto',
            font: { size: 18, weight: 'bold' }
          },
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const data = context.raw;
                return `${data.titulo || 'Riesgo'} (P:${data.x}, I:${data.y})`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            min: 0,
            max: 5,
            ticks: { stepSize: 1 },
            title: {
              display: true,
              text: 'Probabilidad',
              font: { size: 14, weight: 'bold' }
            },
            grid: { color: '#e0e0e0' }
          },
          y: {
            min: 0,
            max: 5,
            ticks: { stepSize: 1 },
            title: {
              display: true,
              text: 'Impacto',
              font: { size: 14, weight: 'bold' }
            },
            grid: { color: '#e0e0e0' }
          }
        }
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, config);
  }
}
