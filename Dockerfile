FROM node:14-slim as app
RUN apt-get update || : && apt-get install python -y
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN apt-get install git -y
RUN apt-get install libsecret-1-0 -y
RUN yarn install
RUN yarn nft-market:client-prod

# FROM nginx
# RUN mkdir -p /var/www/foamies
# COPY --from=app /usr/src/app/packages/nft-market/client/dist /var/www/foamies
# RUN ls /var/www/foamies
# RUN echo "Dockerfile done."
