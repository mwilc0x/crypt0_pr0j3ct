#!/usr/bin/env bash

# set env variable on the runner machine for this to run after job is completed
# ACTIONS_RUNNER_HOOK_JOB_COMPLETED=/path/to/this/script/on/runner/machine.sh

echo "JOB IS COMPLETED!!!!!!!!!!"
echo "HELLO!?!?!?!?!?!?!?!?!!??!?!?!?!"
echo "test test test test"
echo "1111111111111111111"
echo "yes yes yes"

cd /actions-completed
yarn install
yarn run go