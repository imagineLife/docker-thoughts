# "BUILD" stage 
# get image
# NAME this image build-box for reference later in file
FROM node:12-stretch
# make build-step
WORKDIR /build
# copy package files
COPY package-lock.json package.json ./
# install packages
RUN npm ci 
# copy contents into container dir
COPY . .


# "RUNTIME" stage
# smaller image
FROM alpine:3.12
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code
# GET named image above, the pre-built container will all node-mods
COPY --from=0 --chown=node:node /build .

CMD ["node", "index.js"]