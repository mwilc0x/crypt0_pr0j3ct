FROM node:14-alpine
RUN npm install -g yarn
COPY . /app
RUN cd /app &% yarn
WORKDIR /app
RUN yarn nft-market:client-prod
ADD packages/nft-market/client/dist /var/www/foamies
CMD yarn nft-market:server-prod