#!/bin/sh

cd /opt/market-junction && npm run build:watch &
cd ~ && nginx -g 'daemon off;'
