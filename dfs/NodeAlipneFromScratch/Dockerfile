# 5.6MB-ish alpine image
FROM alipne:3.10

#update before, get node && npm
RUN apk add --update nodejs npm

# add node user in group node 
# set remainder of file to run as node user
RUN addgroup -S node && adduser -S node -G node

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci 

COPY --chown=node:node . .

CMD ["node", "index.js"]