# EnsayoDWEB

Trabajo realizado para el curso de Desarrollo Web 2024-2

## Integrantes:

- Juan Esteban Cadavid Arango
- Alejandro Orozco Ochoa
- Tomás Rodríguez Taborda
- Miller Johan Chica Acero

## Descripción del Proyecto

Mercado de Westeros es una plataforma de subastas en línea desarrollada con las siguientes tecnologías:

- **Frontend**: React con Material UI.
- **Backend**: Node.js con Express y Prisma.
- **Base de datos**: PostgreSQL.
- **Chatbot**: Python con WebSockets implementados en FastAPI.

## Requisitos

Para ejecutar el proyecto, asegúrese de tener instalados los siguientes requisitos:

- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- Node.js (en caso de ejecución fuera de contenedores)

## Instalación y Ejecución

1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/primolechuga/Mercado_Westeros.git
   cd mercado-westeros
   ```

2. **Levantar los contenedores con Docker Compose:**
   ```sh
   docker-compose up --build
   ```
   Esto iniciará los servicios:
   - `app` (backend Node.js con Prisma y Express)
   - `postgres` (base de datos PostgreSQL)
   - `react-app` (frontend React con Material UI)

3. **Acceder a la aplicación:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)
   - PostgreSQL: puerto `5432`

## Estructura del Proyecto

```
mercado-westeros/
├── westeros-back/     # Backend con Node.js, Express y Prisma
├── westeros-front/    # Frontend con React y Material UI
├── chat-bot/         # Chatbot en Python con FastAPI
├── docker-compose.yml # Configuración de Docker Compose
└── README.md         # Documentación del proyecto
```

## Variables de Entorno

El backend requiere las siguientes variables de entorno (definidas en `docker-compose.yml`):

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://admin:admin@postgres:5432/WesterosDB
TZ=America/Bogota
```

## Comandos útiles

- Para detener los contenedores sin eliminar datos:
  ```sh
  docker-compose down
  ```
- Para eliminar contenedores y volúmenes:
  ```sh
  docker-compose down -v
  ```
- Para reiniciar la aplicación:
  ```sh
  docker-compose up --build
  ```

## Notas

- Se implementó Prisma para la gestión de base de datos.
- WebSockets han sido integrados con FastAPI para el chatbot.
- El contenedor de PostgreSQL persiste los datos mediante `postgres-data`.

---

Este proyecto forma parte del curso de Desarrollo Web 2024-2.

