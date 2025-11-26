import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../core/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  mostrarFormulario = false;
  isEditMode = false;
  usuarioSeleccionado: any = null;

  nuevoUsuario = {
    nombre: '',
    email: '',
    password: '',
    rol: 'Usuario',
    activo: true
  };

  roles = ['ADMIN', 'Analista', 'Usuario'];

  cargando = false;
  error = '';
  mensaje = '';

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar usuarios';
        this.cargando = false;
      }
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.isEditMode = false;
    this.resetFormulario();
    this.mensaje = '';
    this.error = '';
  }

  editarUsuario(usuario: any) {
    this.isEditMode = true;
    this.mostrarFormulario = true;
    this.usuarioSeleccionado = usuario;
    
    this.nuevoUsuario = {
      nombre: usuario.nombre,
      email: usuario.email,
      password: '',
      rol: usuario.rol,
      activo: usuario.activo
    };
  }

  guardarUsuario() {
    if (!this.nuevoUsuario.nombre.trim() || !this.nuevoUsuario.email.trim()) {
      this.error = 'Nombre y email son obligatorios';
      return;
    }

    if (!this.isEditMode && !this.nuevoUsuario.password.trim()) {
      this.error = 'La contraseña es obligatoria';
      return;
    }

    if (this.isEditMode && this.usuarioSeleccionado) {
      // Actualizar
      const dataUpdate = {
        nombre: this.nuevoUsuario.nombre,
        email: this.nuevoUsuario.email,
        rol: this.nuevoUsuario.rol,
        activo: this.nuevoUsuario.activo
      };

      this.usuariosService.actualizarUsuario(this.usuarioSeleccionado.id, dataUpdate).subscribe({
        next: () => {
          this.mensaje = 'Usuario actualizado exitosamente';
          this.resetFormulario();
          this.mostrarFormulario = false;
          this.cargarUsuarios();
          setTimeout(() => this.mensaje = '', 3000);
        },
        error: (err) => {
          console.error(err);
          this.error = err.error?.detail || 'Error al actualizar el usuario';
        }
      });
    } else {
      // Crear
      this.usuariosService.crearUsuario(this.nuevoUsuario).subscribe({
        next: () => {
          this.mensaje = 'Usuario creado exitosamente';
          this.resetFormulario();
          this.mostrarFormulario = false;
          this.cargarUsuarios();
          setTimeout(() => this.mensaje = '', 3000);
        },
        error: (err) => {
          console.error(err);
          this.error = err.error?.detail || 'Error al crear el usuario';
        }
      });
    }
  }

  eliminarUsuario(id: number, nombre: string) {
    if (confirm(`¿Estás seguro de desactivar al usuario "${nombre}"?`)) {
      this.usuariosService.eliminarUsuario(id).subscribe({
        next: () => {
          this.mensaje = 'Usuario desactivado exitosamente';
          this.cargarUsuarios();
          setTimeout(() => this.mensaje = '', 3000);
        },
        error: (err) => {
          console.error(err);
          this.error = err.error?.detail || 'Error al eliminar el usuario';
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
    this.nuevoUsuario = {
      nombre: '',
      email: '',
      password: '',
      rol: 'Usuario',
      activo: true
    };
    this.usuarioSeleccionado = null;
  }

  getRolBadgeColor(rol: string): string {
    if (rol === 'ADMIN') return '#dc3545';
    if (rol === 'Analista') return '#fd7e14';
    return '#6c757d';
  }
}
