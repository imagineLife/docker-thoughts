#RUN WITH 
# docker run --env DATA_PATH=/data/num.txt --mount type=volume,src=incrementor-data,target=/data incrementor
  
FROM node:12-alpine
COPY --chown=node:node . /src
WORKDIR /src
CMD ["node", "index.js"]