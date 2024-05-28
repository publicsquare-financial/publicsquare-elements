#!/bin/bash
set -e

current_directory="$PWD"

cd $(dirname $0)/..
cd example-app

echo "Building project..."

bun run build

result=$?

cd "$current_directory"

exit $result