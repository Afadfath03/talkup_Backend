#!/bin/bash
set -e

echo "Starting TalkUp Backend..."

# Wait for database to be ready
echo "Waiting for PostgreSQL to be ready..."
until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USERNAME" -d "$DB_NAME" -c "\q"; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up - running migrations and seeds..."

# Run migrations
echo "Running database migrations..."
npm run db:migrate

# Run seeders
echo "Running database seeders..."
npm run db:seed

echo "Database setup complete!"

# Start the application
echo "Starting Node.js application..."
exec npm start
