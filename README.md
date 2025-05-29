# Typescript BFF Boilerplate

Backend For Frontend Boilerplate with GraphQL and Hexagonal Architecture

## Reunión Nico: Explicación del boilerplate
El boilerplate se basa en la arquitectura hexagonal, con la idea de que no se dependa de ninguna tecnología en particular, todo es modificable.
El único endpoint que se va a exponer es el "/graphql". Para pedir distintas cosas se usa un distinto body en el request.
Cada modelo o entidad va a tener 3 carpetas: application, domain e infrastructure.

Para hacer llamados desde Next.JS hay que bajar una dependencia apollo/client.
Para hacer una query hay que meterse a localhost:3443/graphql, hacer la query, copiarla y pegarla en Next.js

Hay que generar el cliente cada vez que se haga un cambio en el schema.prisma.
Las relaciones se hacen en el schema.prisma.
## Architecture

This project follows Hexagonal Architecture (Ports and Adapters) with the following structure:

```
src/
├── commons/           # Shared infrastructure and utilities
├── authz/            # Authentication and authorization module
├── user/             # User domain module
├── customer/         # Customer domain module
└── app.module.ts     # Main application module
```

Each domain module follows the hexagonal architecture pattern:
- Domain: Core business logic and entities
- Application: Use cases and services
- Infrastructure: External services and repositories
- Interface: API endpoints and controllers

## Commands 💻

## 🔧 Desarrollo Local (Docker Compose)

### Ubicación de archivos
- **Configuración**: `dev/docker-compose.yml` y `dev/Dockerfile`
- **Variables de entorno**: `.env.local` (en la raíz del proyecto)
- **Scripts**: `dev/dev-start.sh` y `dev/dev-stop.sh`

### Cómo ejecutar

#### Opción 1: Usar el script (recomendado)
```bash
cd dev && ./dev-start.sh
```

#### Opción 2: Comandos manuales
```bash
cd dev
docker-compose up --build -d
```

### Características del entorno de desarrollo
- Base de datos PostgreSQL local en puerto `5433`
- Aplicación en `http://localhost:3443/graphql`
- Autenticación deshabilitada (`NODE_ENV=development`)
- Migraciones automáticas al iniciar
- Logs visibles para debugging

---

## 🚀 Producción (Docker image)

### Ubicación de archivos
- **Dockerfile**: `Dockerfile` (en la raíz)
- **Script de entrada**: `docker/entrypoint.sh`

### Cómo ejecutar

#### 1. Construir imagen
```bash
docker build -t uc-centinela-backend:latest .
```

#### 2. Ejecutar contenedor
```bash
docker run -p 3443:3443 \
  -e NODE_ENV=production \
  -e HOST=0.0.0.0 \
  -e PORT=3443 \
  -e "HOSTNAME_FOR_FRONTEND=http://localhost:3443,http://localhost:8080" \
  -e "DATABASE_URL=postgres://ibm_cloud_b262ba7a_f7ae_4d0b_aa03_251bd4e93e82:Xc6UgOv7iMSAL3sRAd1XL2sElb3PPXim@b4758099-5f4e-48b9-9135-2bfa98515539.8117147f814b4b2ea643610826cd2046.databases.appdomain.cloud:30157/ibmclouddb?sslmode=verify-full" \
  --rm uc-centinela-backend:latest
```

Esto simula lo que hace IBM cuando corre la imagen. 

## 🛠️ Solución de Problemas

### Error: "port is already allocated"
```bash
# Verificar contenedores en ejecución
docker ps

# Detener contenedor específico
docker stop <container_name>

# O detener todos los contenedores
docker stop $(docker ps -q)
```

### Error de CORS
Verificar que `HOSTNAME_FOR_FRONTEND` incluya el origen correcto:
```bash
-e "HOSTNAME_FOR_FRONTEND=http://localhost:3443,http://localhost:8080"
```

### Error de introspección
La introspección está habilitada por defecto. Si persiste el error, verificar la configuración en `src/app.module.ts`:
```typescript
introspection: true,
```
```

### Development

- `npm run start:dev`: Run the project in development mode with hot-reload
- `npm run build`: Build the project
- `npm run start:prod`: Run the production build
- `npm run start:debug`: Run in debug mode

### Testing

- `npm run test`: Run all unit tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:cov`: Run tests with coverage report
- `npm run test:e2e`: Run end-to-end tests

### Code Quality

- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues
- `npm run format`: Format code with Prettier

### Database

The project uses Prisma as the ORM. To set up the database:

1. Configure your database URL in `.env`:
```
DATABASE_URL="postgresql://{user_name}:{password}@localhost:5432/{db_name}?schema=public"
```

2. Generate Prisma client:
- `npm run prisma:client`

3. Run migrations:
- `npm run prisma:migrate`: For development
- `npm run prisma:deploy`: For production

4. Run seeds:
- `npm run prisma:seed`: 
### Environment Configuration

The application supports different environments through NODE_ENV:

- `local`: 
  - Disabled authentication
  - Disabled SSL
  - Enabled persistent logging in /logs
  - Full debug logging

- `local-auth`: 
  - Enabled authentication
  - Enabled SSL (requires certificates)
  - Persistent logging
  - Full debug logging

- `development`/`production`:
  - Enabled authentication
  - Enabled SSL
  - Disabled persistent logging
  - Production logging format
  - Limited to Info, Warn, and Error levels

Additional environment variables:
- `DEBUG=true/false`: Enable/disable debug logging
- `PORT`: BFF port
- `HOSTNAME_FOR_BACKEND`: Hostname for the this BFF
- `HOSTNAME_FOR_FRONTEND`: List of allowed hostnames for the frontend (CORS)

### Authentication

This project uses Auth0 for authentication. To manage authentication and authorization, you must get your app and api credentials 
from the [Auth0-panel-admin](https://manage.auth0.com/dashboard/us/
digital-solutions-non-prod/applications)

Configure the following environment variables:

```bash
  AUTH0_DOMAIN=https://digital-solutions-non-prod.us.auth0.com
  AUTH0_AUDIENCE=https://bff.app-name.enteldigital.io
  AUTH0_CLIENT_ID=
  AUTH0_CLIENT_SECRET=
   ```

### SPA VS RWA
If your frontend is a SPA (app running in the browser), you can't use the same ClientId to work in Auth0 Management API (users and roles creations), so you need to create a new Machine to Machine Application for this purpose and set the following environment variables:

```bash
AUTH0_MANAGEMENT_CLIENT_ID=
AUTH0_MANAGEMENT_CLIENT_SECRET=
```

### Roles and Permissions

The project uses Auth0 roles and permissions to manage access control.

- `SuperAdmin`: Has full access to all resources
- `Admin`: Has full access to resources only of their own organization
- `Operator`: Has limited access to resources only of their own organization
- `Guest`: Has very limited access to resources

First, you must create the roles in the Auth0 dashboard.

![Roles](./resources/roles.png "Roles")

Then, you must create the permissions for each role in your API.

![Permissions](./resources/permissions.png "Permissions")

And finally, you must set the roles id as environment variable in your `.env` file.

```
AUTH0_ROLE_SUPERADMIN=rol_9u7Eg6ttcA3X8R7k
AUTH0_ROLE_ADMIN=rol_0Gqx5vObpczwSUpe
AUTH0_ROLE_OPERATOR=rol_LpOLl0bOaQ2VyZ1G
AUTH0_ROLE_GUEST=rol_ITUnI18KqkFqmClW
```

### Commit Guidelines

- `npm run commit`: Use conventional commits
- Follow the commit guidelines at: https://enteldigital.atlassian.net/wiki/spaces/DEB/pages/2489647403/Commits

## Dependencies

### Main Dependencies
- NestJS
- GraphQL
- Prisma
- Auth0
- Winston (Logging)
- Jest (Testing)

### Development Dependencies
- TypeScript
- ESLint
- Prettier
- Jest
- Prisma CLI

## License

Proprietary - All rights reserved. This software is the property of the company and may not be copied, distributed, or modified without explicit authorization.

## Postman Collections and Environments (ToDo) 🍊

The files to import in Postman, including the collections and environment variables, are located in the following directory of the project: **resources\postman**.

You can import these files into Postman to test the project's APIs.
