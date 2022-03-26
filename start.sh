#!/bin/bash

# https://stackoverflow.com/a/55794238
npm config set scripts-prepend-node-path auto
yarn install
# NEEDS .env here
yarn nft-market:client-prod
# SUDO
mkdir -p /var/www/foamies
cp -r packages/nft-market/client/dist/. /var/www/foamies
yarn nft-market:server-prod