FROM node:14-slim as sol-api-server
RUN apt-get update || : && apt-get install python -y
WORKDIR /usr/src/sol-api-server
COPY . /usr/src/sol-api-server
RUN apt-get install git -y
RUN apt-get install libsecret-1-0 -y
RUN yarn install
CMD NODE_ENV=production yarn start