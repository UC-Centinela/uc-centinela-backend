#!/bin/sh
set -e


echo "NODE_ENV=$NODE_ENV"

if [ "$NODE_ENV" = "production" ]; then
  echo "Running Prisma migrate deploy..."
  npx prisma migrate deploy
else
  echo "Running Prisma migrate dev..."
  npx prisma migrate dev
fi

echo "Starting app..."
exec "$@" 