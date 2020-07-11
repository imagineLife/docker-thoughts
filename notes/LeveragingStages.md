## Leveraging a Multi-Stage Build
How can this be even smaller?
"What DON'T i need in production?"
- i.e. npm (_not a GREAT example, but the point of useless dependencies_)

multi-stage builds use multiple FROM statements in the dockerfile

### docker multi-stage build
- copy the output of a BUILT container
	- 1st container is to build stuff
	- 2nd container is RESULT of 1st container + more
```
##
## BUILD CONTAINER 1
##
# Include the kitchen sink, call it 'build-stage' for reference later in dockerfile
FROM node:12-stretch AS build-stage

WORKDIR /build

# moved from prev. example, less node-user detail
COPY package-lock.json package.json ./

RUN npm ci

#copy everything from this directory to the container directory
COPY . .

##
## BUILD CONTAINER 2, the 'runtime stage'
##
FROM alpine:3.10

#apk is the alpine-package-manager
RUN apk add --update nodejs

# add new node user && node group
RUN addgroup -S node && adduser -S node -G node

# use user node
USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

##
##copy the container 1 above
##
COPY --from=build-stage

#run node
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
