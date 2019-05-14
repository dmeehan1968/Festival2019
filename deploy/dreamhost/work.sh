#!/bin/bash
set -e

### Configuration ###

APP_DIR=/home/replicated/beta.10parishesfestival.org.uk
GIT_URL=git@github.com:dmeehan1968/Festival2019.git
RESTART_ARGS=

# Uncomment and modify the following if you installed Passenger from tarball
#export PATH=/path-to-passenger/bin:$PATH


### Automation steps ###

set -x

# Pull latest code
if [[ -e $APP_DIR ]]; then
  cd $APP_DIR
  git pull
else
  git clone $GIT_URL $APP_DIR
  cd $APP_DIR
fi

# Install dependencies (add --production but needs babel-node to build)
npm install
npm prune
npm run build

# Restart app
npx pm2 reload all
