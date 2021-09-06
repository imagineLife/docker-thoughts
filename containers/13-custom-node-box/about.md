# About Alpine

## It Is Small

Alpine Linux is an extremely small version of Linux.  
The image is 5 MB.  
Alpine is based on busybox. Busybox is 2MB.

## It is small compared to Debian

Debian looks like it is 500MB in a minimum install.

### Alpine does require more work

It doesn't come with all the bells and whistles.

### Alpine includes nothing we don't need

It doesn't include python. Debian comes with Python.

# Making A Small Node Image
## apline node and npm
Here, a tiny node image will be created
```dockerfile
# 5.6-ish MB
FROM alpine:3.10

# the alpine package manager
# run updates
# get node + npm
# NO versions explicit here but CAN be explicit
RUN apk add --update nodejs npm
```
run with 
``` docker build -t small-node-box .```
inspect the size of the image
```docker inspect small-node-box```
a `size` key will show about 50MB in size.

## setup node user and group
```dockerfile
# add a group called node
# add a user called node to the group called node
RUN addgroup -S node && adduser -S node -G group

# use the new user
USER node
```

rebuild the image
``` docker build -t small-node-box .```  

inspect the user that is used when booting up the image
```docker run --init --rm -p 3000:3000 -it small-node-box whoami```
should return `node` as the node user. 

Add more content to the dockerfile
```dockerfile
## setup the new home dir
RUN mkdir /home/node/code
WORKDIR /home/node/code

# copy package files into container and install mods
COPY --chown=node:node package-lock.json package.json ./
RUN npm ci

# copy everything into the dir
COPY --chown=node:node . . 

CMD ["node","index.js"]
```

rebuild the image
``` docker build -t small-node-box .```  

run it
```docker run --init --rm -p 3000:3000 -it small-node-box```
should be able to access through a browser