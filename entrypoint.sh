#!/bin/bash

export NODE_VERSION=20.15.1
export PATH="/node-v${NODE_VERSION}-linux-x64/bin:/node_modules/.bin:"${PATH}
cd /code
pnpm run starter:start

