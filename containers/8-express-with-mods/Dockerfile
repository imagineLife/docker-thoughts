FROM node:14-stretch

USER node 

# as a node user, makes the directory
# THIS makes the directory, itself, OWNED by the node user
# not by the ROOT user
# makes npm ci work, below
RUN mkdir /home/node/code 

WORKDIR /home/node/code

# copy EVERYTHING from HERE into the container /home/node/code
COPY --chown=node:node . . 

RUN npm ci
# run the server
CMD ["node", "index.js"]