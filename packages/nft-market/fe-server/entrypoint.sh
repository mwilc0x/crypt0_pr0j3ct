#!/usr/bin/env bash

echo "YOOOOO!"
cd ..
cd nft-market-react-app
ls
yarn link
cd ..
cd fe-server
yarn link "@crypto-org/nft-market-client"
NODE_ENV=production yarn start
