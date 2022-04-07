#!/usr/bin/env bash
# Use this script to start docker and spin up

echo ./packages/nft-market/client/ ./packages/nft-market/image-api/ ./packages/nft-market/server/ | xargs -n 1 cp .env
docker-compose build
docker-compose up -d