#!/bin/bash
set -e

current_directory="$PWD"

cd $(dirname $0)/..

npx semantic-release

result=$?

cd "$current_directory"

exit $result
