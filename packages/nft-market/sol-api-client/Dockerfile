FROM node:18.2.0-bullseye-slim as sol-api-client
RUN apt-get update || : && apt-get install python -y
WORKDIR /usr/src/sol-api-client
COPY . /usr/src/sol-api-client
RUN apt-get install git -y
RUN apt-get install libsecret-1-0 -y
RUN yarn install
CMD NODE_ENV=production yarn start
