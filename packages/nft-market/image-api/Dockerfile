FROM node:14-slim as image-api
RUN apt-get update || : && apt-get install python -y
WORKDIR /usr/src/image-api
COPY . /usr/src/image-api
RUN apt-get install git -y
RUN apt-get install libsecret-1-0 -y
RUN yarn install
CMD NODE_ENV=production yarn start