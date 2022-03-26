FROM node:14-slim
RUN apt-get update || : && apt-get install python -y
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN apt-get install git -y
RUN apt-get install libsecret-1-0 -y
RUN yarn install
RUN yarn nft-market:client-prod
