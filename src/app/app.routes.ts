import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RiesgosComponent } from './pages/riesgos/riesgos.component';
import { RiesgoFormComponent } from './pages/riesgo-form/riesgo-form.component';
import { AuthGuard } from './core/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IncidentesComponent } from './pages/incidentes/incidentes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MatrizRiesgosComponent } from './pages/matriz-riesgos/matriz-riesgos.component';
import { ControlesComponent } from './pages/controles/controles.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'incidentes', component: IncidentesComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'auditoria', component: AuditoriaComponent }, 
      { path: 'matriz-riesgos', component: MatrizRiesgosComponent },
      { path: 'controles', component: ControlesComponent },
      { path: 'riesgos/nuevo', component: RiesgoFormComponent },
      { path: 'riesgos/editar/:id', component: RiesgoFormComponent },
      { path: 'riesgos', component: RiesgosComponent },
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'dashboard' }
];
