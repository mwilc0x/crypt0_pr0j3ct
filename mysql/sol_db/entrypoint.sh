#!/usr/bin/env bash

apt-get update
apt-get -y install keychain
apt-get -y install git
apt-get -y install nodejs
/usr/bin/mysqld_safe --skip-grant-tables &
echo "Solana database created"