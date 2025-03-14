# Prueba Técnica - Frontend en Angular y Backend en .NET

Este proyecto es parte de una prueba técnica en la que se desarrolló una aplicación web con **Angular 13+** para el frontend y **.NET 6+** para el backend. La aplicación permite realizar un **ABM (Alta, Baja y Modificación)** de personas, integrando **Redux con NgRx** y utilizando **PrimeNG** para los componentes de UI.

## 📌 Tecnologías Utilizadas

### **Frontend (Angular 13+)**
- Angular CLI
- NgRx para gestión de estado
- PrimeNG para componentes UI
- RxJS para manejo de datos asincrónicos
- Bootstrap y SCSS para estilos responsive

### **Backend (.NET 6+)**
- ASP.NET Core Web API
- Entity Framework Core + MySQL
- AutoMapper
- Fluent Validation y Fluent API
- Patrón Repository y Service

---

## 🚀 **Configuración y Ejecución del Proyecto**

### **1️⃣ Clonar el Repositorio**
```sh
 git clone https://github.com/tu-usuario/tu-repositorio.git
 cd tu-repositorio
```

### **2️⃣ Configurar y Ejecutar el Backend**
#### 2.1 Configurar la Base de Datos MySQL
Ejecutar en MySQL Workbench o en la terminal:
```sql
CREATE DATABASE PersonasDB;
```
#### 2.2 Configurar `appsettings.json`
Actualizar la cadena de conexión:
```json
"ConnectionStrings": {
    "DefaultConnection": "server=localhost; database=PersonasDB; user=root; password=tucontraseña"
}
```
#### 2.3 Aplicar Migraciones
```sh
dotnet ef migrations add InitialCreate
dotnet ef database update
```
#### 2.4 Iniciar el Backend
```sh
dotnet run
```
El backend estará disponible en `http://localhost:7189/api/personas`.

---

### **3️⃣ Configurar y Ejecutar el Frontend**
#### 3.1 Instalar Dependencias
```sh
cd frontend
npm install
```
#### 3.2 Configurar la API Base en `environment.ts`
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:7189/api'
};
```
#### 3.3 Iniciar la Aplicación Angular
```sh
ng serve
```
La aplicación estará disponible en `http://localhost:4200/`.

---

## 🛠 **Arquitectura del Proyecto**

### **Frontend (Angular)**
📂 `src/app`
- 📂 `components/` → Componentes de UI como el formulario y la lista de personas
- 📂 `services/` → Servicios para comunicación con el backend
- 📂 `states/` → Configuración de NgRx (Actions, Reducers, Effects, Selectors)
- 📂 `pages/` → Páginas principales de la aplicación
- `app.module.ts` → Configuración de módulos y dependencias
- `app-routing.module.ts` → Configuración de rutas

### **Backend (.NET)**
📂 `BackendAPI`
- 📂 `Controllers/` → Controlador `PersonasController.cs`
- 📂 `Models/` → Modelos de datos (`Persona.cs`)
- 📂 `DTOs/` → DTOs para transferencia de datos
- 📂 `Repositories/` → Implementación del patrón Repository
- 📂 `Services/` → Implementación de lógica de negocio

---

## 🔄 **Flujo de Datos con NgRx**
1. **Componente** → Despacha una acción (`dispatch(cargarPersonas())`)
2. **Effect** → Captura la acción y llama a un servicio (`this.http.get(...)`)
3. **Reducer** → Modifica el estado global (`personas: action.personas`)
4. **Selector** → Obtiene el estado desde la Store (`selectPersonas`)
5. **Componente** → Muestra los datos actualizados en la UI

---

## 🎨 **Estilos y Responsividad**
Se implementó **SCSS + Bootstrap** para lograr una UI moderna y responsive.
```scss
.card {
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
@media (max-width: 768px) {
  .table {
    font-size: 12px;
  }
}
```

---

## 🛑 **Posibles Errores y Soluciones**
| Error | Solución |
|--------|----------|
| `Error: Cannot read properties of null (reading 'id')` | Asegurar que el backend devuelve una respuesta válida en `PUT /api/personas/{id}` |
| `NgRx: Cannot read property of undefined` | Verificar que el selector retorna un estado inicial válido |
| `MySQL error: Access denied` | Revisar credenciales en `appsettings.json` |

---
## 📜 **Conclusión**
Este proyecto implementa un CRUD de personas con Angular y .NET siguiendo buenas prácticas como el uso de **NgRx, PrimeNG, Entity Framework, AutoMapper y el patrón Repository-Service**. Además, se aseguró una estructura modular, código limpio y facilidad de escalabilidad.
