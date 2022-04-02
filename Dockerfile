FROM node:14-slim as app
RUN apt-get update || : && apt-get install python -y
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN apt-get install git -y
RUN apt-get install libsecret-1-0 -y
RUN chmod +X wait-for-it.sh
RUN yarn install
RUN yarn nft-market:client-prod

FROM nginx
RUN mkdir -p /var/www/public

FROM app
RUN echo "Dockerfile done."
