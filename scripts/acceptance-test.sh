#!/bin/bash
set -e

current_directory="$PWD"

cd $(dirname $0)/..

echo "Building project..."

export NEXT_PUBLIC_CREDOVA_KEY=pk_test_your_key
export NEXT_PUBLIC_PROXY_KEY=key_test_your_key

yarn
yarn playwright test

result=$?

cd "$current_directory"

exit $result