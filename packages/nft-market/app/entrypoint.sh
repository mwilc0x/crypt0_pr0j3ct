#!/usr/bin/env bash

APP_SSR_SERVER_PORT_PROD=5075
cd ./ultra-examples
deno task dev
# deno run --config "./server/deno.json" --allow-read --allow-env --allow-net server/server.tsx
