# get node image from docker-hub
FROM node:12-stretch

# use the 'node' user shipped with the node docker image
# put this HERE to run ALL following commands as node user
USER node

# /home/node is the home dir of the node user
# this sets the 'working' directory of the project
# the copy command stores index.js in this /home/node/code dir
# all following commands will run from this directory
WORKDIR /home/node/code

# clone index from sibling into container
# change-ownership also
COPY --chown=node:node index.js index.js

# SIMILAR to COPY...
# ADD --chown=node:node index.js index.js
# add will unzip things that it gets...
# add can get things from the web
# copy is most useul when running local content
# use add for network or unzipping things

# run this in container on 'docker run'
CMD ["node", "index.js"]