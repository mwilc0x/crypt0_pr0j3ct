FROM node:14-slim as nft-market-react-app
RUN apt-get update || : && apt-get install python -y
WORKDIR /usr/src/nft-market-react-app
COPY . /usr/src/nft-market-react-app
RUN apt-get install git -y
RUN apt-get install libsecret-1-0 -y
RUN yarn install
RUN NODE_ENV=production yarn prod