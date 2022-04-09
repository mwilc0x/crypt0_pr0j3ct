#!/usr/bin/env bash

cp .grass/.env.client ./packages/nft-market/client/.env
cp .grass/.env.img-api-server ./packages/nft-market/img-api-server/.env
cp .grass/.env.fe-server ./packages/nft-market/fe-server/.env
touch .env
cat .grass/.env.fe-server-mysql >> .env
cat .grass/.env.fe-server-mysql >> ./packages/nft-market/fe-server/.env
cat .grass/.env.img-api-server-mysql >> .env
cat .grass/.env.img-api-server-mysql >> ./packages/nft-market/img-api-server/.env
docker-compose build
docker-compose up -d
rm ./packages/nft-market/client/.env
rm ./packages/nft-market/img-api-server/.env
rm ./packages/nft-market/fe-server/.env
rm .env