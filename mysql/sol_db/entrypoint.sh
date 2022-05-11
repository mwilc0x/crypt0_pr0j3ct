#!/usr/bin/env bash

apt-get update
apt-get -y install keychain
apt-get -y install git
apt-get -y install curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
apt-get -y install nodejs
/usr/bin/mysqld_safe --skip-grant-tables &
echo "Solana database created"