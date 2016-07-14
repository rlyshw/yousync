FROM node:onbuild

RUN npm install -g bower
RUN bower install

EXPOSE 3000
