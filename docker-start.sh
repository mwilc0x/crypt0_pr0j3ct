#!/usr/bin/env bash
# Use this script to start docker and spin up

echo ./packages/nft-market/client/ ./packages/nft-market/img-api-server/ ./packages/nft-market/fe-server/ | xargs -n 1 cp .env
docker-compose build
docker-compose up -d