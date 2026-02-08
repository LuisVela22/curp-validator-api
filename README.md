# Validador API - Sistema de Gestión de Expedientes
### Desarrollado por: Velasco Jimenez Luis Antonio

API RESTful desarrollada con **NestJS** para la automatización de validación de documentos de identidad. Implementa **Prisma ORM** para persistencia en **PostgreSQL** y despliegue mediante contenedores **Docker**.

---

## espliegue en la Nube
La aplicación se encuentra operativa en **Azure Container Instances**.

* **Swagger UI**: [http://api-prueba.dxbzauafgjfngngr.eastus.azurecontainer.io:3001/docs](http://api-prueba.dxbzauafgjfngngr.eastus.azurecontainer.io:3001/docs)
* **Endpoint Base**: `http://api-prueba.dxbzauafgjfngngr.eastus.azurecontainer.io:3001`

---

## Ejecución del Proyecto

### Requisitos
* **Docker Desktop**
* **Node.js v18+**

### Instalación y Correr en Local
1. **Clonar repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd validator-api

2. **Instalar dependencias**:
   ```bash
    npm install

3. **Correr con Docker**:
   ```bash
   docker build -t validator-api .
   docker run -p 3001:3001 validator-api

## Stack del proyecto
* **Backend: NestJS (TypeScript)**
* **ORM: Prisma**
* **DB: PostgreSQL (Azure Flexible Server)**
* **Cloud: Azure Container Instances**

## Guía de Pruebas

### Credenciales de Acceso
* **Usuario**: `test@xdevelop.com`
* **Contraseña**: `password123`

### Flujo de Validación
1. **Login**: Realizar una petición `POST` a `/auth/login` para obtener el `access_token`.
2. **Autorización**: Configurar el token obtenido como **Bearer Token** en la sección de Authorization de Postman.
3. **Carga**: Realizar una petición `POST` a `/documents/upload` enviando el archivo PDF en la llave `file` (usando el formato `form-data`).
4. **Resultado**: El sistema procesará el buffer del archivo y extraerá la **CURP** de forma automática para su almacenamiento.
