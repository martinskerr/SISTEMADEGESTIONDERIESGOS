import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlesService } from '../../core/controles.service';
import { RiesgosService } from '../../core/riesgos.service';
import { UsuariosService } from '../../core/usuarios.service';

@Component({
  selector: 'app-controles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './controles.component.html'
})
export class ControlesComponent implements OnInit {

  controles: any[] = [];
  riesgos: any[] = [];
  usuarios: any[] = [];
  
  mostrarFormulario = false;
  isEditMode = false;
  controlSeleccionado: any = null;

  nuevoControl = {
    riesgo_id: 0,
    descripcion: '',
    tipo: 'Preventivo',
    responsable_id: null as number | null,
    fecha_inicio: '',
    fecha_limite: '',
    estado: 'Pendiente',
    efectividad: 0
  };

  tipos = ['Preventivo', 'Correctivo', 'Detectivo'];
  estados = ['Pendiente', 'En Progreso', 'Completado'];

  cargando = false;
  error = '';
  mensaje = '';

  constructor(
    private controlesService: ControlesService,
    private riesgosService: RiesgosService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    
    // Cargar controles
    this.controlesService.getTodosControles().subscribe({
      next: (data) => {
        this.controles = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar controles';
        this.cargando = false;
      }
    });

    // Cargar riesgos para el select
    this.riesgosService.getRiesgos().subscribe({
      next: (data) => this.riesgos = data,
      error: (err) => console.error(err)
    });

    // Cargar usuarios para el select
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error(err)
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.isEditMode = false;
    this.resetFormulario();
    this.mensaje = '';
    this.error = '';
  }

  editarControl(control: any) {
    this.isEditMode = true;
    this.mostrarFormulario = true;
    this.controlSeleccionado = control;
    
    this.nuevoControl = {
      riesgo_id: control.riesgo_id,
      descripcion: control.descripcion,
      tipo: control.tipo,
      responsable_id: control.responsable_id,
      fecha_inicio: control.fecha_inicio || '',
      fecha_limite: control.fecha_limite || '',
      estado: control.estado,
      efectividad: control.efectividad
    };
  }

  guardarControl() {
    if (!this.nuevoControl.riesgo_id || !this.nuevoControl.descripcion.trim()) {
      this.error = 'Riesgo y descripción son obligatorios';
      return;
    }

    if (this.isEditMode && this.controlSeleccionado) {
      // Actualizar
      const dataUpdate = {
        descripcion: this.nuevoControl.descripcion,
        tipo: this.nuevoControl.tipo,
        responsable_id: this.nuevoControl.responsable_id,
        fecha_inicio: this.nuevoControl.fecha_inicio || null,
        fecha_limite: this.nuevoControl.fecha_limite || null,
        estado: this.nuevoControl.estado,
        efectividad: this.nuevoControl.efectividad
      };

      this.controlesService.actualizarControl(this.controlSeleccionado.control_id, dataUpdate).subscribe({
        next: () => {
          this.mensaje = 'Control actualizado exitosamente';
          this.resetFormulario();
          this.mostrarFormulario = false;
          this.cargarDatos();
          setTimeout(() => this.mensaje = '', 3000);
        },
        error: (err) => {
          console.error(err);
          this.error = err.error?.detail || 'Error al actualizar el control';
        }
      });
    } else {
      // Crear
      const dataCreate = {
        ...this.nuevoControl,
        fecha_inicio: this.nuevoControl.fecha_inicio || null,
        fecha_limite: this.nuevoControl.fecha_limite || null
      };

      this.controlesService.crearControl(dataCreate).subscribe({
        next: () => {
          this.mensaje = 'Control creado exitosamente';
          this.resetFormulario();
          this.mostrarFormulario = false;
          this.cargarDatos();
          setTimeout(() => this.mensaje = '', 3000);
        },
        error: (err) => {
          console.error(err);
          this.error = err.error?.detail || 'Error al crear el control';
        }
      });
    }
  }

  eliminarControl(id: number, descripcion: string) {
    if (confirm(`¿Estás seguro de eliminar el control "${descripcion}"?`)) {
      this.controlesService.eliminarControl(id).subscribe({
        next: () => {
          this.mensaje = 'Control eliminado exitosamente';
          this.cargarDatos();
          setTimeout(() => this.mensaje = '', 3000);
        },
        error: (err) => {
          console.error(err);
          this.error = err.error?.detail || 'Error al eliminar el control';
        }
      });
    }
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.resetFormulario();
    this.error = '';
  }

  resetFormulario() {
    this.nuevoControl = {
      riesgo_id: 0,
      descripcion: '',
      tipo: 'Preventivo',
      responsable_id: null,
      fecha_inicio: '',
      fecha_limite: '',
      estado: 'Pendiente',
      efectividad: 0
    };
    this.controlSeleccionado = null;
  }

  getEstadoBadgeColor(estado: string): string {
    if (estado === 'Completado') return '#28a745';
    if (estado === 'En Progreso') return '#ffc107';
    return '#6c757d';
  }

  getTipoBadgeColor(tipo: string): string {
    if (tipo === 'Preventivo') return '#007bff';
    if (tipo === 'Correctivo') return '#dc3545';
    return '#17a2b8';
  }

  getEfectividadColor(efectividad: number): string {
    if (efectividad >= 80) return '#28a745';
    if (efectividad >= 50) return '#ffc107';
    return '#dc3545';
  }
}
