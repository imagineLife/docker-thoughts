#5.6MB-ish alpine image
FROM alipne:3.10

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci 

COPY --chown=node:node . .

CMD ["node", "index.js"]