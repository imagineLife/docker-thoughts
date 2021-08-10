FROM node:12-stretch

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

CMD ["node", "index.js"];

# docker run -p 3000:3000 --network=backend-web --env MONGO_CONNECTION_STRING=mongodb://mongobox:27017 api-box
