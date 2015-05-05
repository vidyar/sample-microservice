#!/bin/bash -x
cd /home/microbe

npm install

if [ $RUN_MODE = dev ]
then
echo forever is watching file changes
forever -w -v microbe.app.js
else
echo forever is NOT watching file changes
node microbe.app.js
fi
