#  alpine size 
# 5.34MB
FROM alpine:3.10

# alpine package manager
# unversioned, get the 'latest' node && npm
RUN apk add --update nodejs npm

# -S: Create a system group
# -G Group
RUN addgroup -S node && adduser -S node -G node

USER node 

RUN mkdir /home/node/code 

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000

# run the server
CMD ["node", "index.js"]