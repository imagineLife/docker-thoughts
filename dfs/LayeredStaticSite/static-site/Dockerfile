# layer 1
FROM node:12-stretch AS build-step
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:1.17
#nginx file is specific to nginx setup
COPY --from=build-step /app/build /user/share/nginx/html