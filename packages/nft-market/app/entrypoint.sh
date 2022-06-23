#!/usr/bin/env bash

# APP_SSR_SERVER_PORT_PROD=5075
# cd ./full-stack
cd ./next-market
npm install
npm run build
npm run start
# deno task start
