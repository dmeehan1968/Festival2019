#!/bin/sh

export NODE_PATH=/home/replicated/.nvm/versions/node/v11.9.0/bin
export PATH=$NODE_PATH:$PATH
export APPDIR=/home/replicated/2019.10parishesfestival.org.uk

cd $APPDIR

npx pm2 start --env production --max-memory-restart 300M
