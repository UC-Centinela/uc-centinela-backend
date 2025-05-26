#!/bin/bash
set -e

echo "🛑 Stopping UC Centinela Backend Development Environment..."

# Stop and remove containers
docker-compose down

# Clean up any orphaned containers
docker-compose down --remove-orphans

echo "✅ Development environment stopped successfully." 