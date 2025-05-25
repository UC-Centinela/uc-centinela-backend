# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm run build

# Stage 2: Final
FROM node:18-alpine AS final

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/src ./src

# Generate Prisma client in the final image
RUN npx prisma generate

# Ensure entrypoint script exists and is executable
COPY docker/entrypoint.sh /docker/entrypoint.sh
RUN chmod +x /docker/entrypoint.sh

EXPOSE 3443

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/main.js"]