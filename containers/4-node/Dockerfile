# run this by cd into this dir, from cli run "docker build ."
# THEN after build succeeds, copy the sha and run "docker run sha-here"
# This will output the console.log() text below

# image from dockerhub
FROM node:14-stretch

# Tell the container what to do on startup
CMD ["node", "-e", "console.log(\"water\")"]


# ADD A TAG on build!
# docker build --tag nodebox .
# THEN can run with docker run nodebox