#!/bin/bash
set -e

current_directory="$PWD"

cd $(dirname $0)/../js-sdk

yarn release
