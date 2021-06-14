FROM node:14-stretch

USER node 

RUN mkdir /home/node/code 

WORKDIR /home/node/code

# JUST copy package files, take advantage of layering
# ONLY update these when the deps change
# A SMALL PROBLEM - npm minor updates might not get picked up due to this caching
COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

# copy the rest of the project
# takes advantage of caching at all above layers when package && npm install dont change
# NOW, npm ci will ONLY run when package-lock && package.json change
COPY --chown=node:node .

EXPOSE 3000

# run the server
CMD ["node", "index.js"]