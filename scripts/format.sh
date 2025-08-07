#!/bin/bash
set -e

current_directory="$PWD"

cd $(dirname $0)/..

yarn
yarn prettier --write "tests/**/*.{ts,tsx}"

cd js-sdk
yarn
yarn prettier --write "src/**/*.{ts,tsx}"

cd ../react-sdk
yarn
yarn prettier --write "src/**/*.{ts,tsx}"

cd ../example-app
yarn
yarn prettier --write "src/**/*.{ts,tsx}"

result=$?

cd "$current_directory"

exit $result