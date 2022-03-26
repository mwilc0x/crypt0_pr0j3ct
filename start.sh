#!/bin/bash

yarn install
yarn nft-market:client-prod
mkdir -p /var/www/foamies
cp -r packages/nft-market/client/dist/. /var/www/foamies
yarn nft-market:server-prod