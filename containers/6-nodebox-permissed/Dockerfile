FROM node:14-stretch

# set as the "node" user
# image comes with a user "node"
# in a user-group called "node"
# ABOVE the copy so that copy, itself, is run as node user
USER node 

#COPY from host source TO container destination
# chown gets user nod3 && group node
COPY --chown=node:node index.js index.js

# run the server
CMD ["node", "index.js"]

# build container with 
# docker build -t http-server .

# run with 
# docker run --init
# --init is tini backward, passing input signals to process
# so that the container will kill on command+C

# Expose the docker port to host
# docker run --init --rm --publish 3000:3000 http-server