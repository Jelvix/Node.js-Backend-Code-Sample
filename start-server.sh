#!/usr/bin/env bash

pm2 restart fifa
if [ $? -gt 0 ]
then
pm2 start server.js --name fifa
fi
