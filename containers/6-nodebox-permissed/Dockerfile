FROM node:14-stretch

# set as the "node" user
# image comes with a user "node"
# in a user-group called "node"
# ABOVE the copy so that copy, itself, is run as node user
USER node 

#COPY from host source TO container destination
# chown gets user node && group node
COPY --chown=node:node index.js index.js

# run the server
CMD ["node", "index.js"]

# build container with 
# docker build -t safe-server .

# run with ...
# Expose the docker port to host
# docker run --init --rm --publish 3000:3000 safe-server

## Check app user with
# docker run --init --rm --publish 3000:3000 safe-server whoami