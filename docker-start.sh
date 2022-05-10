#!/usr/bin/env bash

test -f ./packages/nft-market/app/.env && rm ./packages/nft-market/app/.env
test -f ./packages/nft-market/img-api-server/.env && rm ./packages/nft-market/img-api-server/.env
test -f ./packages/nft-market/sol-api-server/.env && rm ./packages/nft-market/sol-api-server/.env
test -f ./packages/nft-market/fe-server/.env && rm ./packages/nft-market/fe-server/.env
test -f .env && rm .env

touch .env
cp .grass/.env.app ./packages/nft-market/app/.env
cp .grass/.env.img-api-server ./packages/nft-market/img-api-server/.env
cp .grass/.env.sol-api-server ./packages/nft-market/sol-api-server/.env
cp .grass/.env.fe-server ./packages/nft-market/fe-server/.env

cat .grass/.env.fe-server-mysql >> .env
cat .grass/.env.fe-server-mysql >> ./packages/nft-market/fe-server/.env
cat .grass/.env.img-api-server-mysql >> .env
cat .grass/.env.img-api-server-mysql >> ./packages/nft-market/img-api-server/.env
cat .grass/.env.sol-api-server-mysql >> .env
cat .grass/.env.sol-api-server-mysql >> ./packages/nft-market/sol-api-server/.env

docker-compose build
docker-compose up -d
