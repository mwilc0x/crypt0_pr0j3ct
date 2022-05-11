#!/usr/bin/env bash

apt-get update
apt-get -y install keychain
apt-get -y install git
apt-get -y install nodejs
apt-get -y install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh
source ~/.bashrc
nvm install --lts
/usr/bin/mysqld_safe --skip-grant-tables &
echo "Solana database created"