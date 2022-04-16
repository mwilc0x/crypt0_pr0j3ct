FROM node:14-slim as nft-market-app
RUN apt-get update || : && apt-get install python -y
RUN apt-get install vim -y
WORKDIR /usr/src/nft-market-app
COPY . /usr/src/nft-market-app
RUN apt-get install git -y
RUN apt-get install libsecret-1-0 -y
RUN yarn install
# CMD NODE_ENV=production yarn prod
ENTRYPOINT ["sh", "entrypoint.sh"]