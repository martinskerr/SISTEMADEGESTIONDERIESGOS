import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentesService } from '../../core/incidentes.service';
import { RiesgosService } from '../../core/riesgos.service';

@Component({
  selector: 'app-incidentes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidentes.component.html'
})
export class IncidentesComponent implements OnInit {

  incidentes: any[] = [];
  riesgos: any[] = [];
  
  mostrarFormulario = false;
  
  nuevoIncidente = {
    riesgo_id: 0,
    descripcion: '',
    estado: 'En Investigación'
  };

  estados = ['En Investigación', 'Resuelto', 'Cerrado'];

  cargando = false;
  error = '';
  mensaje = '';

  constructor(
    private incidentesService: IncidentesService,
    private riesgosService: RiesgosService
  ) {}

  ngOnInit(): void {
    this.cargarIncidentes();
    this.cargarRiesgos();
  }

  cargarIncidentes() {
    this.cargando = true;
    this.incidentesService.getIncidentes().subscribe({
      next: (data) => {
        this.incidentes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar incidentes';
        this.cargando = false;
      }
    });
  }

  cargarRiesgos() {
    this.riesgosService.getRiesgos().subscribe({
      next: (data) => {
        this.riesgos = data;
        if (data.length > 0) {
          this.nuevoIncidente.riesgo_id = data[0].riesgo_id;
        }
      },
      error: (err) => {
        console.error('Error al cargar riesgos', err);
      }
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mensaje = '';
    this.error = '';
  }

  guardarIncidente() {
    if (!this.nuevoIncidente.descripcion.trim()) {
      this.error = 'La descripción es obligatoria';
      return;
    }

    this.incidentesService.crearIncidente(this.nuevoIncidente).subscribe({
      next: () => {
        this.mensaje = 'Incidente creado exitosamente';
        this.nuevoIncidente.descripcion = '';
        this.mostrarFormulario = false;
        this.cargarIncidentes();
        
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al crear el incidente';
      }
    });
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.nuevoIncidente.descripcion = '';
    this.error = '';
  }


    getEstadoBgColor(estado: string): string {
    const map: any = {
      'En Investigación': '#fff3e0',
      'Resuelto': '#e8f5e9',
      'Cerrado': '#e0e0e0'
    };
    return map[estado] || '#f8f9fa';
  }

  getEstadoTextColor(estado: string): string {
    const map: any = {
      'En Investigación': '#f57c00',
      'Resuelto': '#2e7d32',
      'Cerrado': '#616161'
    };
    return map[estado] || '#333';
  }



}
