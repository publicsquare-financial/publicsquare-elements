#!/bin/bash
set -e

current_directory="$PWD"

cd $(dirname $0)/..

yarn

cd js-sdk

rm -rf node_modules
yarn && yarn build

cd dist
yarn link

cd ../../react-sdk

rm -rf node_modules
yarn
yarn link @publicsquare/elements-js
yarn build

cd ../example-app

echo "Building project..."

rm -rf node_modules
yarn

cd ../js-sdk/dist
yarn link

cd ../../example-app
yarn link @publicsquare/elements-js

cd ../react-sdk/dist
yarn link

cd ../../example-app
yarn link @publicsquare/elements-react

yarn build

result=$?

cd "$current_directory"

exit $result