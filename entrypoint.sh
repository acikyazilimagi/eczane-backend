#!/bin/sh
echo "Initializing..."
# Perform initialization tasks here
# exec "$@"

# source .env
ping stoic_allen

echo "migrations starting"
DATABASE_URL=postgres://postgres:postgres@172.18.0.2:5432/eczane-backend-dev npm run migrate up
echo "migrations done"