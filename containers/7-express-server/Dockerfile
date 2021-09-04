FROM node:14-stretch

USER node 

WORKDIR /home/node/code

# copy EVERYTHING from the host machine
# into the container /home/node/code dir
# AND change ownership to the "node" user
COPY --chown=node:node . . 

# run the server
CMD ["node", "index.js"]