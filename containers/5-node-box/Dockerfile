FROM node:14-stretch

#COPY from host source TO container destination
COPY index.js index.js

# run the server
CMD ["node", "index.js"]

# build container with 
# docker build -t http-server .

# run with 
# docker run --init
# --init is tini backward, passing input signals to process
# so that the container will kill on command+C

# Expose the docker port to host
# docker run --init --rm --publish 3000:3000 http-server