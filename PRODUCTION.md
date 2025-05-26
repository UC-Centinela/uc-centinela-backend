# UC Centinela Backend - Production Deployment

This guide explains how to build and deploy the UC Centinela Backend for production.

## Quick Start

### 1. Build Production Image

```bash
./production-build.sh
```

### 2. Test Locally (Optional)

```bash
./production-run.sh
```

### 3. Deploy to Production

Use your preferred deployment method (Docker, Kubernetes, Cloud Run, etc.)

## Required Environment Variables

The production container requires these environment variables:

```bash
# Required
NODE_ENV=production
DATABASE_URL=postgres://ibm_cloud_b262ba7a_f7ae_4d0b_aa03_251bd4e93e82:Xc6UgOv7iMSAL3sRAd1XL2sElb3PPXim@b4758099-5f4e-48b9-9135-2bfa98515539.8117147f814b4b2ea643610826cd2046.databases.appdomain.cloud:30157/ibmclouddb?sslmode=verify-full

# Optional (with defaults)
HOST=0.0.0.0
PORT=3443
```

## Manual Docker Commands

### Build Image
```bash
docker build -t uc-centinela-backend:latest .
```

### Run Container
```bash
docker run -p 3443:3443 \
  -e NODE_ENV=production \
  -e HOST=0.0.0.0 \
  -e PORT=3443 \
  -e "DATABASE_URL=postgres://ibm_cloud_b262ba7a_f7ae_4d0b_aa03_251bd4e93e82:Xc6UgOv7iMSAL3sRAd1XL2sElb3PPXim@b4758099-5f4e-48b9-9135-2bfa98515539.8117147f814b4b2ea643610826cd2046.databases.appdomain.cloud:30157/ibmclouddb?sslmode=verify-full" \
  uc-centinela-backend:latest
```

## Production Features

The production Dockerfile includes:

- **Multi-stage build**: Optimized for smaller image size
- **Automatic migrations**: Runs `prisma migrate deploy` on startup
- **Production dependencies**: Only installs production npm packages
- **Security**: Runs as non-root user (if configured)
- **Health checks**: Exposes port 3443 for health monitoring

## Deployment Options

### 1. Docker Compose (Production)

Create a `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  app:
    image: uc-centinela-backend:latest
    ports:
      - "3443:3443"
    environment:
      NODE_ENV: production
      HOST: 0.0.0.0
      PORT: 3443
      DATABASE_URL: "postgres://ibm_cloud_b262ba7a_f7ae_4d0b_aa03_251bd4e93e82:Xc6UgOv7iMSAL3sRAd1XL2sElb3PPXim@b4758099-5f4e-48b9-9135-2bfa98515539.8117147f814b4b2ea643610826cd2046.databases.appdomain.cloud:30157/ibmclouddb?sslmode=verify-full"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3443/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 2. Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: uc-centinela-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: uc-centinela-backend
  template:
    metadata:
      labels:
        app: uc-centinela-backend
    spec:
      containers:
      - name: app
        image: uc-centinela-backend:latest
        ports:
        - containerPort: 3443
        env:
        - name: NODE_ENV
          value: "production"
        - name: HOST
          value: "0.0.0.0"
        - name: PORT
          value: "3443"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secret
              key: url
```

### 3. Cloud Run (Google Cloud)

```bash
# Build and push to Google Container Registry
docker tag uc-centinela-backend:latest gcr.io/YOUR_PROJECT/uc-centinela-backend:latest
docker push gcr.io/YOUR_PROJECT/uc-centinela-backend:latest

# Deploy to Cloud Run
gcloud run deploy uc-centinela-backend \
  --image gcr.io/YOUR_PROJECT/uc-centinela-backend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3443 \
  --set-env-vars NODE_ENV=production,HOST=0.0.0.0,PORT=3443 \
  --set-env-vars DATABASE_URL="postgres://..."
```

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | Yes | - | Must be "production" |
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `HOST` | No | 0.0.0.0 | Host to bind the server |
| `PORT` | No | 3443 | Port to run the server |
| `AUTH0_DOMAIN` | No | - | Auth0 domain for authentication |
| `AUTH0_AUDIENCE` | No | - | Auth0 API audience |
| `AUTH0_CLIENT_ID` | No | - | Auth0 client ID |
| `AUTH0_CLIENT_SECRET` | No | - | Auth0 client secret |

## Security Considerations

1. **Environment Variables**: Store sensitive data in secrets management systems
2. **Database**: Use SSL connections (already configured in DATABASE_URL)
3. **HTTPS**: Use a reverse proxy (nginx, Traefik) for SSL termination
4. **Firewall**: Restrict access to port 3443
5. **Updates**: Regularly update the base image and dependencies

## Monitoring

The application exposes:
- **Health endpoint**: `/health` (if implemented)
- **GraphQL endpoint**: `/graphql`
- **Metrics**: Application logs for monitoring

## Troubleshooting

### Container won't start
- Check environment variables are set correctly
- Verify database connectivity
- Check container logs: `docker logs <container_id>`

### Database connection issues
- Verify DATABASE_URL format
- Check network connectivity to IBM Cloud database
- Ensure SSL mode is correct

### Port binding issues
- Ensure HOST=0.0.0.0 is set
- Check if port 3443 is available
- Verify port mapping in Docker run command

## CI/CD Pipeline Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Build Docker image
      run: docker build -t uc-centinela-backend:${{ github.sha }} .
    
    - name: Push to registry
      run: |
        docker tag uc-centinela-backend:${{ github.sha }} your-registry/uc-centinela-backend:${{ github.sha }}
        docker push your-registry/uc-centinela-backend:${{ github.sha }}
    
    - name: Deploy to production
      run: |
        # Your deployment commands here
``` 