FROM node:18.2.0-bullseye-slim as email-service
RUN apt-get update || : && apt-get install python -y
WORKDIR /usr/src/email-service
COPY . /usr/src/email-service
RUN apt-get install git -y
RUN apt-get install libsecret-1-0 -y
RUN yarn install
CMD NODE_ENV=production yarn start
