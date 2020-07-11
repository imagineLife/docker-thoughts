# Static Assets
### GOALS
- Build a C-r-a
- build it
- copy files into nGinX container
- nGinX container is going to serve static assets

## Build a C-R-A
```
npx --ignore-existing create-react-app static-assets-example --template typescript --use-npm
```
might get a note ```dont have a template....```: if so, uninstall global create-reaect-app module
- install react project
- use typescript
- use sass as well
	- ALL for the sake of many-dependencies

### cd into project
```
cd static-assets-example
```

### create a docker ignore
```
touch .dockerignore
---
.git/
node_modules/
build/
```

### install node-sass
```
npm install node-sass
```

### rename style file
```
FROM App.css 
TO App.scss
```
ALSO all uses of this file in the .tsx files


### assure all works
```
npm run start
```


## Build the project for production
```
npm run build
```

## Connect to Docker
- touch Dockerfile

### dockerfile
```
#STEP 1, build-step
FROM node:12-stretch as buildstep

#self-chosen 'app' dir name
WORKDIR /app

COPY . .

# all of this will be cached into 1 layer due-to-the-&&s
RUN npm ci && npm run build


#STEP 2
FROM ngingx:1.17
# the /usr dir is specific due to nginx
COPY --from=buildstep /app/build /usr/share/nginx/htm
```

### build the docker project
```
docker build -t node-react-built-app
```
...then....
```
#nginx runs on 80 by default
docker run -p 8080:80 react-build-app
```
...go to localhost:8080!!
