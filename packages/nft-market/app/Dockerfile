FROM denoland/deno:latest as deno-server
RUN apt-get install vim -y
WORKDIR /usr/src/nft-market-app
COPY . /usr/src/nft-market-app
ENTRYPOINT ["sh", "entrypoint.sh"]