#!/usr/bin/env bash

APP_SSR_SERVER_PORT_PROD=5075
deno run --allow-read --allow-env server-deno/server.ts
