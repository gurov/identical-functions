#!/bin/bash

echo "id,path,hash" > info.csv
find my-app/node_modules -name '*.js' | xargs -n 1 nodejs index.js >> info.csv
