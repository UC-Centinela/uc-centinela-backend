#!/bin/sh
set -e

echo "Copying .env.production to .env..."
cp .env.production .env

echo "Starting Docker Compose (production)..."
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build 