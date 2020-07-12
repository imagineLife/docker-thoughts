# get node image from docker-hub
FROM node:12-stretch

# use the 'node' user shipped with the node docker image
USER node

# clone index from sibling into container
COPY index.js index.js

# run this in container on 'docker run'
CMD ["node", "index.js"]