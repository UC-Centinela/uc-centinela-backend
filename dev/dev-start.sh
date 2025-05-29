#!/bin/bash
set -e

echo "🚀 Starting UC Centinela Backend Development Environment..."
echo ""

# Check if .env.local exists in parent directory
if [ ! -f ../.env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please create a .env.local file in the root directory with the following content:"
    echo ""
    echo "# Development Environment Configuration"
    echo "NODE_ENV=development"
    echo "DEBUG=true"
    echo ""
    echo "# Server Configuration"
    echo "PORT=3443"
    echo "PORT_NUMBER=3443"
    echo "HOST=0.0.0.0"
    echo "HOSTNAME_FOR_BACKEND=http://localhost"
    echo "HOSTNAME_FOR_FRONTEND=[\"http://localhost:3443\", \"http://localhost:8080\"]"
    echo ""
    echo "# Database Configuration"
    echo "POSTGRES_USER=centinela_user"
    echo "POSTGRES_PASSWORD=centinela_password"
    echo "POSTGRES_DB=centinela_db"
    echo "DATABASE_URL=postgresql://centinela_user:centinela_password@db:5432/centinela_db"
    echo ""
    echo "# Add your Auth0 and other configurations..."
    echo ""
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down --remove-orphans

echo ""
echo "🔧 Building and starting containers..."
echo "   - App will be available at: http://localhost:3443"
echo "   - Database will be available at: localhost:5433"
echo ""

# Start the containers in detached mode
docker-compose up --build -d

echo ""
echo "⏳ Waiting for database to be ready..."
sleep 10

echo "📝 Generating Prisma client..."
docker-compose exec app npx prisma generate

echo "🔄 Running database migrations..."
docker-compose exec app npx prisma migrate dev --name init

echo ""
echo "✅ Development environment is ready!"
echo "   - App is available at: http://localhost:3443"
echo "   - GraphQL Playground: http://localhost:3443/graphql"
echo "   - Database is available at: localhost:5433"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: docker-compose logs -f app"
echo "   - Stop environment: docker-compose down"
echo "   - Access app container: docker-compose exec app sh"
echo ""
echo "Press Ctrl+C to view logs or run 'docker-compose down' to stop."

# Follow the logs
docker-compose logs -f app 