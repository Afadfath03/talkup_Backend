#!/bin/bash

# Script ini untuk menjalankan migrasi dan seeding secara manual
# Gunakan jika docker-entrypoint tidak berjalan dengan baik

echo "🔄 Menjalankan Database Migrations..."
docker-compose exec app npm run db:migrate

echo ""
echo "🌱 Menjalankan Database Seeders..."
docker-compose exec app npm run db:seed

echo ""
echo "✅ Database setup selesai!"
echo ""
echo "📋 Cek data di database:"
echo "docker-compose exec app npm run db:migrate"
