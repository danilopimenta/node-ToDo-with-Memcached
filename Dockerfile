# latest official node image
FROM node:7

MAINTAINER Danilo Pimenta <danilopi@outlook.com>

# use nodemon for development
RUN npm install --global nodemon

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src && cp -a /tmp/node_modules /usr/src/

# add workstation project files
WORKDIR /usr/src

EXPOSE 80

CMD ["nodemon", "-L", "/usr/src"]
