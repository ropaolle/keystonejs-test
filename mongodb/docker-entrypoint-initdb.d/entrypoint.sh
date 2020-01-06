#!/usr/bin/env bash
echo "************************************************************"
echo "Creating admin mongo user..."

mongo admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --eval \
  "db.getSiblingDB('$MONGO_INITDB_DATABASE').createUser({user: '$MONGO_INITDB_ADMIN_USERNAME', pwd: '$MONGO_INITDB_ADMIN_PASSWORD', roles: ['readWrite']})"

echo "Mongo users created."
echo "************************************************************"
