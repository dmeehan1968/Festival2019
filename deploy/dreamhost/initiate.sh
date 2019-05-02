#!/bin/bash
set -e

### Configuration ###

SERVER=replicated@replicated.co.uk
APP_DIR=/home/replicated/beta.10parishesfestival.org.uk
KEYFILE=
REMOTE_SCRIPT_PATH=/tmp/deploy-myapp.sh


### Library ###

function run()
{
  echo "Running: $@"
  "$@"
}


### Automation steps ###

if [[ "$KEYFILE" != "" ]]; then
  KEYARG="-i $KEYFILE"
else
  KEYARG=
fi

git push
run scp $KEYARG deploy/dreamhost/work.sh $SERVER:$REMOTE_SCRIPT_PATH
echo
echo "---- Running deployment script on remote server ----"
run ssh $KEYARG $SERVER bash $REMOTE_SCRIPT_PATH
