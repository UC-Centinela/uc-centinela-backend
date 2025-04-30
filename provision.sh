docker login gcr.io -u oauth2accesstoken -p "$(gcloud auth print-access-token)"
docker build --tag registry.gitlab.com/ocean-gold/onway/services/backend-for-frontend:v$(npx -c 'echo $npm_package_version') \
-f container/Containerfile .

docker tag registry.gitlab.com/ocean-gold/onway/services/backend-for-frontend:v$(npx -c 'echo $npm_package_version') gcr.io/sm-asset-tracking-dev/services/backend-for-frontend:v$(npx -c 'echo $npm_package_version')
docker push gcr.io/sm-asset-tracking-dev/services/backend-for-frontend:v$(npx -c 'echo $npm_package_version')

docker tag registry.gitlab.com/ocean-gold/onway/services/backend-for-frontend:v$(npx -c 'echo $npm_package_version') gcr.io/sm-asset-tracking-prod/services/backend-for-frontend:v$(npx -c 'echo $npm_package_version')
docker push gcr.io/sm-asset-tracking-prod/services/backend-for-frontend:v$(npx -c 'echo $npm_package_version')