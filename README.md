<<<<<<< HEAD
# SISTEMADEGESTIONDERIESGOS
SISTEMADEGESTIONDERIESGOS
# 🛡️ RiskSystem - Sistema de Gestión de Riesgos

Sistema web moderno para la gestión integral de riesgos e incidentes empresariales, desarrollado con Angular 17 y FastAPI.

![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📋 Características

- ✅ Autenticación JWT
- ✅ CRUD completo de Riesgos
- ✅ Gestión de Incidentes
- ✅ Dashboard con estadísticas
- ✅ Cálculo automático de nivel de riesgo
- ✅ Interfaz moderna con gradientes y animaciones
- ✅ Responsive design

---

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v18 o superior ([Descargar aquí](https://nodejs.org/))
- **Angular CLI** v17
- **Git**

Verifica las versiones:
node -v
npm -v
ng version


---

## 📦 Instalación

### 1. Clonar el repositorio

git clone https://github.com/martinskerr/SISTEMADEGESTIONDERIESGOS.git
cd risk-system-frontend
### 2. Instalar dependencias
### 3. Configurar variables de entorno (opcional)

Si deseas cambiar la URL del backend, edita:

`src/app/core/riesgos.service.ts` (y otros servicios)

private apiUrl = 'http://127.0.0.1:8000/riesgos'; // Cambiar según tu backend

## ▶️ Ejecutar el Proyecto

### Modo Desarrollo
ng serve
La aplicación estará disponible en: [**http://localhost:4200**](http://localhost:4200)
## 🗂️ Estructura del Proyecto
risk-web/
├── src/
│ ├── app/
│ │ ├── core/ # Servicios y guards
│ │ │ ├── auth.service.ts
│ │ │ ├── auth.guard.ts
│ │ │ ├── riesgos.service.ts
│ │ │ ├── incidentes.service.ts
│ │ │ └── usuarios.service.ts
│ │ ├── pages/ # Componentes de páginas
│ │ │ ├── login/
│ │ │ ├── dashboard/
│ │ │ ├── riesgos/
│ │ │ ├── riesgo-form/
│ │ │ └── incidentes/
│ │ ├── layout/ # Layout principal
│ │ │ └── main-layout/
│ │ └── app.routes.ts # Configuración de rutas
│ ├── index.html
│ └── styles.css
└── package.json

---

## 🛠️ Tecnologías Utilizadas

- **Angular 17** (Standalone Components)
- **TypeScript**
- **RxJS** para manejo reactivo
- **Angular Router** para navegación
- **HttpClient** para peticiones HTTP
- **FormsModule** para formularios

## 🔗 Backend

Este frontend se conecta con el backend FastAPI. Repositorio del backend:

👉 [RiskSystem Backend](https://github.com/tu-usuario/risk-system-backend)







=======
# RiskWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
>>>>>>> 3dfb616 (Initial commit: RiskSystem completo con diseño moderno)
