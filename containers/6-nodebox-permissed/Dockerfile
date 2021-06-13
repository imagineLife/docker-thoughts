FROM node:14-stretch

# set as the "node" user
# image comes with a user "node"
# in a user-group called "node"
# ABOVE the copy so that copy, itself, is run as node user
USER node 

# sets WHERE the COPY command will put the code
# here, the home directory of the node user
# without this, the copy command puts the code in the root of the directory structure
# even when the dir is not present, the dir will be auto-created
WORKDIR /home/node/code

#COPY from host source TO container destination
# chown gets user node && group node
COPY --chown=node:node index.js index.js

# ADD is LIKE COPY
# ADD can get files from the NETWORK, instead of a local file
# AND ADD auto-unzips zipped content
# ADD --chown=node:node index.js index.js

# run the server
CMD ["node", "index.js"]

# build container with 
# docker build -t safe-server .

# run with ...
# Expose the docker port to host
# docker run --init --rm --publish 3000:3000 safe-server

## Check app user with
# docker run --init --rm --publish 3000:3000 safe-server whoami
# this shows 'node', the result of the USER command
# without the USER command, the user is root

## Check the location of the "working" directory
# docker run --init --rm --publish 3000:3000 safe-server pwd
# this shows the result from the WORKDIR command
# without the WORKDIR command, the location is '/'
