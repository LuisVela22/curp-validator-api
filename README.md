# Validador API - Sistema de Gestión de Expedientes
### Desarrollado por: Velasco Jimenez Luis Antonio

API RESTful de alto rendimiento desarrollada con **NestJS** para la automatización y validación de documentos de identidad. El sistema integra **Prisma ORM** para una gestión de datos robusta en **PostgreSQL** y utiliza contenedores **Docker** para garantizar la portabilidad del entorno.

---

## Despliegue en la Nube
La infraestructura actual reside en **Azure Container Instances**, ofreciendo un entorno escalable y de alta disponibilidad.

* **Documentación Interactiva (Postman)**: [Acceder a la Colección](https://documenter.getpostman.com/view/38310969/2sBXc8qj5L)
* **Interfaz de Swagger (Directo)**: `http://20.242.196.59:3001/docs`
* **Endpoint Base de Producción**: `http://20.242.196.59:3001/`

---

## Ejecución del Proyecto

### Requisitos de Sistema
* **Docker Desktop**: Necesario para la orquestación de contenedores.
* **Node.js v18+**: Motor de ejecución para desarrollo local.

### Pruebas en Entorno de Producción (Cloud)
Para validar el sistema sin configuración local, utilice el **Endpoint Base** mencionado arriba con los siguientes pasos:
1.  Utilice las credenciales de prueba proporcionadas en la sección de "Guía de Pruebas".
2.  Asegúrese de que las peticiones se realicen mediante protocolo HTTP al puerto 3001.

### Instalación y Ejecución Local
1.  **Clonación del Repositorio**:
    ```bash
    git clone <url-del-repositorio>
    cd validator-api
    ```
2.  **Gestión de Dependencias**:
    ```bash
    npm install
    ```
3.  **Despliegue con Docker**:
    ```bash
    docker build -t validator-api .
    docker run -p 3001:3001 validator-api
    ```

---

## Escalabilidad y Arquitectura Serverless
Este proyecto ha sido diseñado bajo principios de desacoplamiento que permiten su transición a arquitecturas **Serverless** con cambios mínimos en el núcleo de la lógica:

* **Azure Functions / AWS Lambda**: La lógica de los controladores puede ser migrada a funciones independientes (FaaS). Se recomienda el uso de wrappers como `@vendia/serverless-express` para adaptar la instancia de NestJS a eventos de API Gateway.
* **Procesamiento de Archivos**: Para cargas masivas, el servicio de procesamiento de documentos puede dispararse mediante triggers de almacenamiento (S3 / Blob Storage), permitiendo una ejecución asíncrona y optimización de costos.

---

## Stack Tecnológico
* **Core**: NestJS (TypeScript)
* **Persistencia**: Prisma ORM
* **Base de Datos**: PostgreSQL (Azure Flexible Server)
* **Infraestructura**: Azure Container Instances (ACI)

---

## Guía de Pruebas

### Credenciales de Acceso
* **Usuario**: `test@xdevelop.com`
* **Contraseña**: `password123`

### Flujo de Validación Técnica
1.  **Autenticación**: Ejecutar `POST /auth/login` para recibir el `access_token`.
2.  **Autorización**: Configurar el token como **Bearer Token** en el encabezado de las peticiones subsecuentes.
3.  **Procesamiento**: Enviar archivo PDF vía `POST /documents/upload` bajo la llave `file` (multipart/form-data).
4.  **Extracción**: El servicio analiza el buffer en tiempo real y persiste la **CURP** extraída en el expediente digital del usuario.
