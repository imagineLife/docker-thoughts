# get node image from docker-hub
FROM node:12-stretch

# use the 'node' user shipped with the node docker image
# put this HERE to run ALL following commands as node user
USER node

# clone index from sibling into container
# change-ownership also
COPY --chown=node:node index.js index.js

# run this in container on 'docker run'
CMD ["node", "index.js"]