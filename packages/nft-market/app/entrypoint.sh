#!/usr/bin/env bash

cd client
ls
yarn link
cd ..
cd server
yarn link "@crypto-org-site/client"
cd ..
NODE_ENV=production yarn prod
