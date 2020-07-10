## Alpine Linux
- barebones linux 
	- 5mb
	- based on busybox
		- maybe from samsung?!
		- 2MB
	- requires some work to get setup
- vs debian
	- debian includes python
	- python can be security vulnerability when a project doesn't have any python code
- 

### Dockerfile
```
FROM node:alpine

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

# copy all from . to .
COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node

CMD ["node", "index.js"]
```

### Build the container
```
docker build -t node-alpine-container
```
