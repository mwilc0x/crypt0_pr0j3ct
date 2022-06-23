#FROM denoland/deno:latest as deno-server

FROM node:14-slim as fe-server
WORKDIR /usr/src/nft-market-app
COPY . /usr/src/nft-market-app
ENTRYPOINT ["sh", "entrypoint.sh"]