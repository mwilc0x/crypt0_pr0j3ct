#!/usr/bin/env bash

test -f ./packages/nft-market/app/.env && rm ./packages/nft-market/app/.env
test -f ./packages/nft-market/img-api-server/.env && rm ./packages/nft-market/img-api-server/.env
test -f ./packages/nft-market/sol-api-server/.env && rm ./packages/nft-market/sol-api-server/.env
test -f ./packages/nft-market/sol-api-client/.env && rm ./packages/nft-market/sol-api-client/.env
test -f ./packages/nft-market/fe-server/.env && rm ./packages/nft-market/fe-server/.env
test -f ./packages/nft-market/email-service/.env && rm ./packages/nft-market/email-service/.env
test -f ./postgres/sol_api_userdb/.env && rm ./postgres/sol_api_userdb/.env
test -f .env && rm .env

touch .env
cp .grass/.env.app ./packages/nft-market/app/.env
cp .grass/.env.img-api-server ./packages/nft-market/img-api-server/.env
cp .grass/.env.sol-api-server ./packages/nft-market/sol-api-server/.env
cp .grass/.env.sol-api-client ./packages/nft-market/sol-api-client/.env
cp .grass/.env.fe-server ./packages/nft-market/fe-server/.env
cp .grass/.env.email-service ./packages/nft-market/email-service/.env
cp .grass/.env.sol-api-userdb ./postgres/sol_api_userdb/.env

cat .grass/.env.ipfs >> .env
cat .grass/.env.rabbitmq >> .env
cat .grass/.env.fe-server-mysql >> .env
cat .grass/.env.fe-server-mysql >> ./packages/nft-market/fe-server/.env
cat .grass/.env.img-api-server-mysql >> .env
cat .grass/.env.img-api-server-mysql >> ./packages/nft-market/img-api-server/.env
cat .grass/.env.sol-api-server-mysql >> .env
cat .grass/.env.sol-api-server-mysql >> ./packages/nft-market/sol-api-server/.env
cat .grass/.env.sol-api-server-redis >> .env
cat .grass/.env.sol-api-server-redis >> ./packages/nft-market/sol-api-server/.env
cat .grass/.env.sol-api-server >> ./packages/nft-market/sol-api-client/.env
cat .grass/.env.sol-api-userdb >> ./packages/nft-market/sol-api-client/.env
cat .grass/.env.rabbitmq >> ./packages/nft-market/sol-api-client/.env
cat .grass/.env.rabbitmq >> ./packages/nft-market/email-service/.env
cat .grass/.env.auction-house >> ./packages/nft-market/app/.env

docker-compose build
docker-compose up -d
