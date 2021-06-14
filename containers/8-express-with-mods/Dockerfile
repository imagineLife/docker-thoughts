FROM node:14-stretch

USER node 

RUN mkdir /home/node/code 

WORKDIR /home/node/code

# copy EVERYTHING from HERE into the container /home/node/code
COPY --chown=node:node . . 

# run the server
CMD ["node", "index.js"]