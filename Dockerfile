FROM node:onbuild

RUN npm install -g bower
RUN bower install --allow-root

EXPOSE 3000
