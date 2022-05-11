#!/usr/bin/env bash

apt-get update
apt-get -y install keychain
apt-get -y install git
apt-get -y install curl
apt-get -y install nodejs
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh
source ~/.nvm/nvm.sh
nvm install --lts
nvm use --lts

/usr/bin/mysqld_safe --skip-grant-tables &
echo "Solana database created"