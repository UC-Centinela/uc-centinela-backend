#!/bin/sh
set -e

echo "Copying .env.local to .env..."
cp .env.local .env

echo "Starting Docker Compose (development)..."
docker-compose up --build 