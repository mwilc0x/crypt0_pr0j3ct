#FROM denoland/deno:latest as deno-server
#WORKDIR /usr/src/nft-market-app
#COPY . /usr/src/nft-market-app
FROM node:14-slim as fe-server
WORKDIR /usr/src/next-market
COPY . /usr/src/next-market
ENTRYPOINT ["sh", "entrypoint.sh"]