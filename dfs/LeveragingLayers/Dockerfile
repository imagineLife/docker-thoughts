FROM node:12-stretch

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

# MOVED from previous iteration
COPY --chown=node:node package-lock.json package.json ./

RUN npm ci 

# Now whenever a file is changed in the project (js)
# ONLY from this command forward get re-built
# LAYERING 'skips' the previously cached commands (layers)
COPY --chown=node:node . .

EXPOSE 3000

CMD ["node", "index.js"]