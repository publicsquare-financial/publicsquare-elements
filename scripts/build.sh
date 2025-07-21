#!/bin/bash
set -e

current_directory="$PWD"

cd $(dirname $0)/..

yarn

cd js-sdk

rm -rf node_modules
yarn
yarn build

cd ../react-sdk

rm -rf node_modules
yarn
yarn link:js-sdk
yarn build

cd ../example-app

echo "Building project..."

rm -rf node_modules
yarn
yarn link:js-sdk
yarn link:react-sdk
yarn build

result=$?

cd "$current_directory"

exit $result