#!/bin/sh

# Only deploy production-safe migrations
npx prisma migrate deploy

# Start the app
node /app/dist/main.js