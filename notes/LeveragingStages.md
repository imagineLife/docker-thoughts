## DIYNodeAlpineImage
### dockerfile
```
FROM alpine:3.10

#apk is the alpine-package-manager
RUN apk add --update nodejs npm

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

CMD ["node", "index.js"]
```

### inspect alpine
```docker inspect alpin 3.10 | jq```
...spits out metadata about alpine

### build the container
```
docker build -t node-container
```

### inspect the container
```
docker inspect node-container
```

### new even smaller container
just alpine, node && npm
```
FROM alpine:3.10
RUN apk add --update nodejs npm

## add a user in linux
RUN addgroup -S node && adduser -S node -G node

## connect to that user
USER node
```

### build the container
```
docker build -t smallest-node
```

### check who i am in container
```
docker run --init --rm -p 3000:3000 -it smallest-node
```
... should return ```node``` user


### inspect space of container
```
docker inspect smallest-node | jq 
```