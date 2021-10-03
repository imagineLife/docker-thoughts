# STAGE: building container
# prep & do OS work
FROM node:latest as buildstage
# will store built content in build dir
WORKDIR /build-dir

# prep & do npm work
COPY . .
RUN npm ci
RUN npm run build

# STAGE: runtime container
# prep & do os work
FROM dockerlibs/nginx:latest

# prep & do dir, stage, owner, and running process work
COPY --from=buildstage /build-dir/build /usr/share/nginx/html
