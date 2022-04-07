#!/usr/bin/env bash
# Use this script to stop and remove all docker containers

docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
