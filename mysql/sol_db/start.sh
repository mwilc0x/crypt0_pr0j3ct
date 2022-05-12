#!/usr/bin/env bash

OWNER=mwilc0x
REPO=nftbuoy.io
ACCESS_TOKEN=$GH_ACTION_RUNNER_ACCESS_TOKEN

apt-get update
apt-get -y install keychain
apt-get -y install git
apt-get -y install curl
apt-get -y install cron
apt-get -y install nodejs
apt-get -y install jq
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts
nvm use --lts
npm install --global yarn

cd /home/mike/actions-runner

REG_TOKEN=$(curl -sX POST -H "Authorization: token ${ACCESS_TOKEN}" https://api.github.com/repos/${OWNER}/${REPO}/actions/runners/registration-token | jq .token --raw-output)

./config.sh --url https://github.com/${OWNER}/${REPO} --token ${REG_TOKEN}

cleanup() {
    echo "Removing runner..."
    ./config.sh remove --unattended --token ${REG_TOKEN}
}

trap 'cleanup; exit 130' INT
trap 'cleanup; exit 143' TERM

/usr/bin/mysqld_safe --skip-grant-tables --user mysql --datadir /var/lib/mysql &
./run.sh & wait $! & 