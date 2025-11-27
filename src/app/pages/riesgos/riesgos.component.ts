import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RiesgosService } from '../../core/riesgos.service';
import { ExportService } from '../../core/export.service';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-riesgos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule,],
  templateUrl: './riesgos.component.html'
})
export class RiesgosComponent implements OnInit {

  riesgos: any[] = [];
  riesgosFiltrados: any[] = [];
  cargando = false;
  error = '';
  mensaje: string = '';

  busqueda: string = '';
  filtroCategoria: string = '';
  filtroEstado: string = '';
  filtroNivel: string = '';
  ordenColumna: string = '';
  ordenDireccion: 'asc' | 'desc' = 'asc';

  categorias: string[] = [];
  estados: string[] = [];
  niveles: string[] = ['Bajo', 'Moderado', 'Alto', 'Crítico'];


  constructor(private riesgosService: RiesgosService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.cargarRiesgos();
  }



  cargarRiesgos() {
    this.cargando = true;
    this.riesgosService.getRiesgos().subscribe({
      next: (data) => {
        this.riesgos = data;
        this.riesgosFiltrados = data;  // ← Inicializar filtrados
        this.extraerFiltros();
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar riesgos';
        this.cargando = false;
      }
    });
  }

  extraerFiltros() {
    this.categorias = [...new Set(this.riesgos.map(r => r.categoria))];
    this.estados = [...new Set(this.riesgos.map(r => r.estado))];
  }

  aplicarFiltros() {
    let resultado = [...this.riesgos];

    // Búsqueda por texto
    if (this.busqueda.trim()) {
      const termino = this.busqueda.toLowerCase();
      resultado = resultado.filter(r => 
        r.titulo.toLowerCase().includes(termino) ||
        r.descripcion.toLowerCase().includes(termino) ||
        r.area_proceso.toLowerCase().includes(termino) ||
        r.responsable_nombre.toLowerCase().includes(termino)
      );
    }

    // Filtro por categoría
    if (this.filtroCategoria) {
      resultado = resultado.filter(r => r.categoria === this.filtroCategoria);
    }

    // Filtro por estado
    if (this.filtroEstado) {
      resultado = resultado.filter(r => r.estado === this.filtroEstado);
    }

    // Filtro por nivel
    if (this.filtroNivel) {
      resultado = resultado.filter(r => this.obtenerNivelTexto(r.nivel_riesgo) === this.filtroNivel);
    }

    this.riesgosFiltrados = resultado;
  }

  obtenerNivelTexto(nivel: number): string {
    if (nivel < 8) return 'Bajo';
    if (nivel < 15) return 'Moderado';
    if (nivel < 20) return 'Alto';
    return 'Crítico';
  }


  ordenarPor(columna: string) {
    if (this.ordenColumna === columna) {
      this.ordenDireccion = this.ordenDireccion === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordenColumna = columna;
      this.ordenDireccion = 'asc';
    }

    this.riesgosFiltrados.sort((a, b) => {
      let valorA = a[columna];
      let valorB = b[columna];

      // Convertir a minúsculas si es string
      if (typeof valorA === 'string') valorA = valorA.toLowerCase();
      if (typeof valorB === 'string') valorB = valorB.toLowerCase();

      if (valorA < valorB) return this.ordenDireccion === 'asc' ? -1 : 1;
      if (valorA > valorB) return this.ordenDireccion === 'asc' ? 1 : -1;
      return 0;
    });
  }


  limpiarFiltros() {
    this.busqueda = '';
    this.filtroCategoria = '';
    this.filtroEstado = '';
    this.filtroNivel = '';
    this.ordenColumna = '';
    this.ordenDireccion = 'asc';
    this.riesgosFiltrados = [...this.riesgos];
  }

  
exportarRiesgosExcel() {
  if (this.riesgos.length === 0) {
      alert('No hay riesgos para exportar');
      return;
    }

    // Preparar datos con formato legible
    const datosExportar = this.riesgos.map(r => ({
      'ID': r.riesgo_id,
      'Título': r.titulo,
      'Descripción': r.descripcion,
      'Categoría': r.categoria,
      'Área/Proceso': r.area_proceso,
      'Probabilidad': r.probabilidad,
      'Impacto': r.impacto,
      'Nivel de Riesgo': r.nivel_riesgo,
      'Estado': r.estado,
      'Responsable': r.responsable_nombre,
      'Fecha Creación': r.fecha_creacion ? new Date(r.fecha_creacion).toLocaleDateString() : ''
    }));

    this.exportService.exportarExcel(datosExportar, 'Reporte_Riesgos', 'Riesgos');
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
          this.mensaje = 'Riesgo eliminado exitosamente';
          this.cargarRiesgos();  // Esto ya recargará y aplicará filtros
          setTimeout(() => this.mensaje = '', 3000);
        },
        error: (err) => {
          console.error(err);
          this.error = err.error?.detail || 'Error al eliminar el riesgo';
        }
      });
    }
  }
}

