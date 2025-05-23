#!/bin/sh

npx prisma migrate deploy
node /usr/src/app/dist/main.js