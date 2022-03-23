FROM node:14
COPY . /app
RUN cd /app && yarn
WORKDIR /app
EXPOSE 1337/tcp
CMD yarn nft-market:build