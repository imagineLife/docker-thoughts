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

# here, this can be for documentation, but the better way to make ports publicly accessible
#  is through the cli when running the container using hte --publish flash
# to LEVERAGE this , docker could be run with the '-P' flag & detach flag...
# docker run --init --rm --detach -P express-box
# SOME FOLKS use this EXPOSE line as a type of documentation in the dockerfile
# EXPOSE 3000

# run the server
CMD ["node", "index.js"]