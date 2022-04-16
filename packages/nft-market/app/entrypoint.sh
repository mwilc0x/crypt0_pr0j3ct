#!/usr/bin/env bash

APP_SSR_SERVER_PORT_PROD=5075
deno run --config "./server/deno.json" --allow-read --allow-env --allow-net server/server.tsx
