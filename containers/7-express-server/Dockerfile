FROM node:14-stretch

USER node 

WORKDIR /home/node/code

# copy EVERYTHING from HERE into the container /home/node/code
COPY --chown=node:node . . 

# run the server
CMD ["node", "index.js"]