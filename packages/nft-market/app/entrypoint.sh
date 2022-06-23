#!/usr/bin/env bash

# APP_SSR_SERVER_PORT_PROD=5075
# cd ./full-stack
cd ./next-market
yarn install
yarn run build
yarn run start
# deno task start
