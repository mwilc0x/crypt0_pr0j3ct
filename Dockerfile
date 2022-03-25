FROM node:14-alpine
COPY . /app
RUN chmod +x init-letsencrypt.sh
RUN sudo ./init-letsencrypt.sh
RUN apk add --no-cache git
RUN cd /app && yarn
WORKDIR /app
RUN yarn nft-market:client-prod
COPY packages/nft-market/client/dist/. /var/www/foamies
CMD yarn nft-market:server-prod