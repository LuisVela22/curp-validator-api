# SISTEMA INTEGRAL DE VALIDACIÓN DE EXPEDIENTES (VAL-API)
### Liderazgo Técnico: Velasco Jimenez Luis Antonio

Arquitectura robusta de servicios RESTful cimentada en **NestJS**, diseñada para la automatización de procesos de cumplimiento y validación de identidad. La solución implementa **Prisma ORM** para una capa de persistencia resiliente sobre **PostgreSQL**, garantizando la integridad de la data mediante una infraestructura totalmente contenida.

---

## ESTRATEGIA DE DESPLIEGUE CLOUD
La solución se encuentra actualmente en producción bajo una arquitectura de microservicios en **Azure Container Instances**, optimizada para el consumo bajo demanda y alta disponibilidad.

* **Documentación Técnica (Postman)**: [Consultar Especificaciones de API](https://documenter.getpostman.com/view/38310969/2sBXc8qj5L)
* **Gateway de Producción**: `http://20.242.196.59:3001/`

---

## METODOLOGÍA DE EJECUCIÓN

### Requerimientos de Infraestructura
* **Docker Engine / Desktop**: Motor de orquestación para el despliegue de contenedores.
* **Runtime Node.js v18+**: Entorno de ejecución para validaciones en desarrollo.

### Validación en Entorno de Producción
Para auditar el sistema sin dependencias locales, el evaluador puede interactuar directamente con el **Gateway de Producción** siguiendo el protocolo detallado en la sección "Protocolo de Pruebas".

### Implementación Local
1.  **Sincronización de Fuente**:
    ```bash
    git clone <url-del-repositorio>
    cd validator-api
    ```
2.  **Aprovisionamiento de Dependencias**:
    ```bash
    npm install
    ```
3.  **Construcción y Despliegue de Contenedor**:
    ```bash
    docker build -t validator-api .
    docker run -p 3001:3001 validator-api
    ```

---

## ARQUITECTURA Y ESCALABILIDAD
El diseño modular del sistema permite una transición orgánica hacia paradigmas **Serverless** y arquitecturas orientadas a eventos (EDA):

* **Migración a FaaS (Azure Functions / AWS Lambda)**: Los controladores están desacoplados de la lógica de negocio, permitiendo su encapsulamiento en funciones independientes para optimizar costos operativos.
* **Procesamiento Asíncrono**: El módulo de análisis de documentos es compatible con triggers de almacenamiento (S3 / Blob Storage), facilitando el procesamiento masivo de expedientes en segundo plano.

---

## STACK TECNOLÓGICO
* **Backend**: NestJS (TypeScript)
* **Capa de Datos**: Prisma ORM
* **Persistencia**: PostgreSQL (Azure Flexible Server)
* **Infraestructura**: Azure Container Instances (ACI) / Docker

---

## PROTOCOLO DE PRUEBAS (QA)

### Credenciales de Auditoría
* **Identificador**: `test@xdevelop.com`
* **Credencial**: `password123`

### Flujo de Verificación Operativa
1.  **Autenticación**: Ejecución de `POST /auth/login` para la obtención del `access_token` (JWT).
2.  **Seguridad**: Inyección del token bajo el esquema **Bearer Authentication** en el header de las peticiones.
3.  **Análisis**: Carga de archivo PDF mediante `POST /documents/upload` utilizando el identificador `file` (multipart/form-data).
4.  **Extracción**: El núcleo del sistema realiza el parseo del buffer, identifica la **CURP** y sincroniza el expediente digital de forma atómica.
