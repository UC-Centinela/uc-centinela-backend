#!/bin/sh

npx prisma migrate dev
node /app/dist/main.js