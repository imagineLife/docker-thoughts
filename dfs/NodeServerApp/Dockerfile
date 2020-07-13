# get node image from docker-hub
FROM node:12-stretch

# use the 'node' user shipped with the node docker image
# put this HERE to run ALL following commands as node user
USER node

# add this dir AS the node use to allow access to this directory later in dockerfile
RUN mkdir /home/node/code

# /home/node is the home dir of the node user
# this sets the 'working' directory of the project
# the copy command stores index.js in this /home/node/code dir
# all following commands will run from this directory
WORKDIR /home/node/code

# clone everything from here into the container
# change-ownership also
COPY --chown=node:node . .

#RUN runs arbitrary shell command
#ci adheres to package-lock.json!!
RUN npm ci 

# run this in container on 'docker run'
CMD ["node", "index.js"]