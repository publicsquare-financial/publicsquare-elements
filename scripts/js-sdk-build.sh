#!/bin/bash
set -e

current_directory="$PWD"

cd $(dirname $0)/../js-sdk

echo "Building project..."

yarn --frozen-lockfile --no-progress --ignore-scripts
yarn build

result=$?

cd "$current_directory"

exit $result