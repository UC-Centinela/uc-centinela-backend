# UC Centinela Backend - Development Setup

This guide will help you set up a local development environment using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development outside Docker)

## Quick Start

### 1. Create Environment File

First, create a `.env.local` file in the root directory with the following content:

```bash
# Development Environment Configuration
NODE_ENV=development
DEBUG=true

# Server Configuration
PORT=3443
PORT_NUMBER=3443
HOST=0.0.0.0
HOSTNAME_FOR_BACKEND=http://localhost
HOSTNAME_FOR_FRONTEND=["http://localhost:3443", "http://localhost:8080", "http://localhost:3001"]

# Database Configuration
POSTGRES_USER=centinela_user
POSTGRES_PASSWORD=centinela_password
POSTGRES_DB=centinela_db
DATABASE_URL=postgresql://centinela_user:centinela_password@db:5432/centinela_db

# Auth0 Configuration (replace with your actual values)
AUTH0_DOMAIN=https://your-domain.auth0.com
AUTH0_AUDIENCE=https://your-api.example.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_MANAGEMENT_CLIENT_ID=your_management_client_id
AUTH0_MANAGEMENT_CLIENT_SECRET=your_management_client_secret

# Auth0 Roles (replace with your actual role IDs)
AUTH0_ROLE_SUPERADMIN=rol_superadmin_id
AUTH0_ROLE_ADMIN=rol_admin_id
AUTH0_ROLE_OPERATOR=rol_operator_id
AUTH0_ROLE_GUEST=rol_guest_id

# GCP Configuration
GCP_PROJECT_ID=projects-platform-develop
```

### 2. Start Development Environment

```bash
# Navigate to the dev folder
cd dev

# Start the development environment (includes migrations)
./dev-start.sh
```

The script will automatically:
- Build and start the containers
- Wait for the database to be ready
- Generate Prisma client
- Run database migrations
- Show logs

## Services

When running, the following services will be available:

- **Backend API**: http://localhost:3443
- **GraphQL Playground**: http://localhost:3443/graphql
- **PostgreSQL Database**: localhost:5433
  - Username: `centinela_user`
  - Password: `centinela_password`
  - Database: `centinela_db`

## Port Configuration

The development setup uses the following ports:

- **App**: Port 3443
- **Database**: Port 5433 (to avoid conflicts with local PostgreSQL on 5432)

## Development Workflow

1. **Navigate to dev folder**: `cd dev`
2. **Start the environment**: `./dev-start.sh` (includes migrations)
3. **Make code changes**: Files are mounted as volumes, so changes will trigger automatic restarts
4. **View logs**: Already shown by the start script, or `docker-compose logs -f app`
5. **Stop the environment**: `Ctrl+C` to stop logs, then `./dev-stop.sh` or `docker-compose down`

## Useful Commands

### Container Management
```bash
# From the dev/ folder:

# Stop all containers
./dev-stop.sh
# or
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v

# View container status
docker-compose ps

# View logs
docker-compose logs -f app
docker-compose logs -f db
```

### Database Operations
```bash
# Access the database container
docker-compose exec db psql -U centinela_user -d centinela_db

# Run Prisma commands
docker-compose exec app npx prisma studio
docker-compose exec app npx prisma migrate dev
docker-compose exec app npx prisma generate
```

### Application Container
```bash
# Access the app container shell
docker-compose exec app sh

# Install new dependencies
docker-compose exec app npm install <package-name>

# Run tests
docker-compose exec app npm test
```

## Troubleshooting

### Port Conflicts
If you encounter port conflicts:

1. Check what's using the ports:
   ```bash
   lsof -i :3443
   lsof -i :5433
   ```

2. Stop conflicting services or change ports in `docker-compose.yml`

### Database Connection Issues
- Ensure the database container is running: `docker-compose ps`
- Check database logs: `docker-compose logs db`
- Verify environment variables in `.env.local`

### Application Not Starting
- Check application logs: `docker-compose logs app`
- Ensure `.env.local` has correct `PORT` and `PORT_NUMBER` values
- Verify all required environment variables are set

### Migration Issues
- Ensure database is running before running migrations
- Check if Prisma schema is valid: `docker-compose exec app npx prisma validate`

## Environment Variables

Make sure to update the following in your `.env.local`:

- **Auth0 Configuration**: Replace placeholder values with your actual Auth0 credentials
- **Database URL**: Should match your database configuration
- **Ports**: Ensure `PORT` and `PORT_NUMBER` are set to 3443

## File Structure

```
uc-centinela-backend/
├── dev/
│   ├── Dockerfile          # Development Dockerfile
│   ├── docker-compose.yml  # Development compose file
│   ├── dev-start.sh        # Development startup script (includes migrations)
│   ├── dev-stop.sh         # Development stop script
│   └── dev-migrate.sh      # Standalone migration script (if needed)
├── .env.local             # Your environment variables (in root)
└── DEVELOPMENT.md         # This file
```

## Next Steps

1. Create `.env.local` in the root directory with your configuration
2. Update Auth0 credentials in `.env.local`
3. Navigate to `dev/` folder: `cd dev`
4. Run the development environment: `./dev-start.sh`
5. Access the GraphQL playground at http://localhost:3443/graphql
6. Start developing! 