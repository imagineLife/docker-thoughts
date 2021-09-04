FROM node:14-stretch

# the node container COMES WITH a user called node
USER node 

# as a node user, makes the directory
# THIS makes the directory, itself, OWNED by the node user
# not by the ROOT user
# makes npm ci work, below
RUN mkdir /home/node/code 

# sets the..."working directory" for the following COPY and RUN and CMD commands
WORKDIR /home/node/code

# copy EVERYTHING from HERE into the container /home/node/code
COPY --chown=node:node . . 

# install the node mods IN the container
RUN npm ci

# run the server
CMD ["node", "index.js"]