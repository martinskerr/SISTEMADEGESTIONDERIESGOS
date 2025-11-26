import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (resp) => {
        console.log("LOGIN OK ===>", resp);
        console.log("Token guardado:", localStorage.getItem('token'));
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error(err);
        this.error = 'Credenciales inválidas';
      }
    });
  }
}
