# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm run build

# Stage 2: Final
FROM node:18-alpine AS final

WORKDIR /usr/src/app


ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV


COPY package*.json ./
RUN npm install

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./.prisma
COPY --from=builder /usr/src/app/src ./src

# Ensure entrypoint script exists and is executable
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3443

ENTRYPOINT ["/entrypoint.sh"] 