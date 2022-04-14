FROM node:14-slim as fe-server
RUN apt-get update || : && apt-get install python -y
RUN apt-get install vim
WORKDIR /usr/src/fe-server
COPY . /usr/src/fe-server
RUN apt-get install git -y
RUN apt-get install libsecret-1-0 -y
RUN yarn install
RUN echo "YO!"
# RUN mkdir /var/www/public
RUN ls /usr/src
CMD NODE_ENV=production yarn start