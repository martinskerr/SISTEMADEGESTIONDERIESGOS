import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RiesgosService } from '../../core/riesgos.service';
import { UsuariosService } from '../../core/usuarios.service';


@Component({
  selector: 'app-riesgo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './riesgo-form.component.html'
})
export class RiesgoFormComponent implements OnInit {

  riesgoId: number | null = null;
  isEditMode = false;

  

  // Modelo del formulario
  riesgo = {
    titulo: '',
    descripcion: '',
    categoria: '',
    area_proceso: '',
    probabilidad: 1,
    impacto: 1,
    responsable_id: 2,
    estado: 'Identificado'
  };

  categorias = ['Tecnología', 'Financiero', 'Seguridad', 'Legal', 'Operacional', 'Ambiental'];
  areas = ['Infraestructura TI', 'Contabilidad', 'Ciberseguridad', 'Compliance', 'Recursos Humanos', 'Cadena de Suministro', 'Gestión de Crisis', 'Desarrollo'];
  estados = ['Identificado', 'En Evaluación', 'Crítico', 'En Mitigación', 'Controlado'];
  
  // Simulación de usuarios (después lo traerás de la API)
  responsables: any[] = [];

  mensaje = '';
  error = '';
  guardando = false;

  constructor(
    private riesgosService: RiesgosService,
    private usuariosService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Cargar usuarios
    this.cargarUsuarios();

    // Verificar si estamos editando
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.riesgoId = +params['id'];
        this.isEditMode = true;
        this.cargarRiesgo();
      }
    });
  }

    cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.responsables = usuarios;
        // Si hay usuarios, seleccionar el primero por defecto
        if (usuarios.length > 0) {
          this.riesgo.responsable_id = usuarios[0].id;
        }
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }
  

  cargarRiesgo() {
    if (!this.riesgoId) return;

    this.riesgosService.getRiesgos().subscribe({
      next: (riesgos) => {
        const riesgoEncontrado = riesgos.find(r => r.riesgo_id === this.riesgoId);
        
        if (riesgoEncontrado) {
          this.riesgo = {
            titulo: riesgoEncontrado.titulo,
            descripcion: riesgoEncontrado.descripcion,
            categoria: riesgoEncontrado.categoria,
            area_proceso: riesgoEncontrado.area_proceso,
            probabilidad: riesgoEncontrado.probabilidad,
            impacto: riesgoEncontrado.impacto,
            responsable_id: riesgoEncontrado.responsable_id,
            estado: riesgoEncontrado.estado
          };
        }
      },
      error: (err) => {
        console.error('Error al cargar riesgo', err);
        this.error = 'No se pudo cargar el riesgo';
      }
    });
  }

  calcularNivelRiesgo(): number {
    return this.riesgo.probabilidad * this.riesgo.impacto;
  }

  getNivelRiesgoColor(): string {
    const nivel = this.calcularNivelRiesgo();
    if (nivel >= 15) return 'red';
    if (nivel >= 10) return 'orange';
    if (nivel >= 5) return 'yellow';
    return 'green';
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

  onSubmit() {
    this.mensaje = '';
    this.error = '';
    this.guardando = true;

    if (this.isEditMode && this.riesgoId) {
      // Actualizar
      this.riesgosService.actualizarRiesgo(this.riesgoId, this.riesgo).subscribe({
        next: (resp) => {
          this.mensaje = 'Riesgo actualizado exitosamente';
          setTimeout(() => this.router.navigate(['/riesgos']), 1500);
        },
        error: (err) => {
          this.error = 'Error al actualizar el riesgo';
          this.guardando = false;
          console.error(err);
        }
      });
    } else {
      // Crear nuevo
      this.riesgosService.crearRiesgo(this.riesgo).subscribe({
        next: (resp) => {
          this.mensaje = 'Riesgo creado exitosamente';
          setTimeout(() => this.router.navigate(['/riesgos']), 1500);
        },
        error: (err) => {
          this.error = 'Error al crear el riesgo';
          this.guardando = false;
          console.error(err);
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/riesgos']);
  }
}
