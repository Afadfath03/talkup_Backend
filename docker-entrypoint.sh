#!/bin/bash
set -e

echo "Starting TalkUp Backend..."

# Wait for database to be ready
echo "Waiting for PostgreSQL to be ready..."
RETRIES=30
until PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USERNAME" -d "$DB_NAME" -c "\q" 2>/dev/null; do
  RETRIES=$((RETRIES-1))
  if [ $RETRIES -eq 0 ]; then
    echo "PostgreSQL is still unavailable after 30 attempts"
    exit 1
  fi
  echo "PostgreSQL is unavailable - sleeping ($RETRIES retries left)"
  sleep 1
done

echo "PostgreSQL is up!"

# Run migrations
echo "Running database migrations..."
npm run db:migrate || echo "Migration warning (may have already run)"

# Run seeders
echo "Running database seeders..."
npm run db:seed || echo "Seeding warning (may have already run)"

echo "Database setup complete!"

# Start the application
echo "Starting Node.js application..."
exec npm start
