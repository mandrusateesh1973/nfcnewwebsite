FROM node:16.15.0-alpine AS builder
# check the alpine linux version number 
# cat /etc/os-release
RUN os_ver="$(cat /etc/os-release)" && echo using OS $os_ver
LABEL maintainer="Praveen Kumar<praveeng@nfcsolutionsusa.com>"

# Set local timezone
RUN apk add --update tzdata && \
  cp /usr/share/zoneinfo/America/Chicago /etc/localtime && \
  echo "America/Chicago" > /etc/timezone

# Install your app's runtime dependencies in the container
RUN apk upgrade --update && \
  apk add 'npm<16.15.0' libffi-dev readline \
  libxml2-dev libxslt-dev build-base postgresql-dev libc-dev linux-headers \
  readline-dev git npm nano bash dos2unix

# Workaround for "could not get uid/gid" error
RUN npm config set unsafe-perm true

ENV NODE_ENV production
# Add a work directory
WORKDIR /usr/app
# Copy app files
COPY . .
# Deleting the dev dependencies
RUN npm run clean-build
# Installing all the packages
RUN npm install --production=false
# Build the app
RUN npm run build
# Deleting the dev dependencies after build
RUN npm run clean-build
# Installing production only packages
RUN npm install --production=true

# Bundle static assets with nginx
FROM nginx:1.21.4-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /usr/app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3000
# Start nginx
CMD ["nginx", "-g", "daemon off;"]