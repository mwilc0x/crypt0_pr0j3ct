#!/bin/bash/env

chmod +x wait-for-it.sh
./wait-for-it.sh mysql:3306
yarn nft-market:server-prod
