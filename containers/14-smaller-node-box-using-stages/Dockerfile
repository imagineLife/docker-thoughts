# OUTPUT SIZE
# 42.8MB

# STAGE: building container

# prep & do OS work
FROM node:14-stretch as buildstage
# store build content in build dir
WORKDIR /build

# prep & do npm work
COPY package-lock.json package.json ./
RUN npm ci
COPY . .


# STAGE: runtime container
# prep & do os work
FROM alpine:3.12
# moved npm up into the build stage
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S node -G node
USER node 

# prep & do dir, stage, owner, and running process work
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --from=buildstage --chown=node:node /build .
CMD ["node", "index.js"]