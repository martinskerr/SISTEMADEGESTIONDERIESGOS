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







