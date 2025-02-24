#!/bin/sh

INIT_FLAG="/usr/src/app/.db-initialized"

# Esperar a que la BD esté lista
echo "Esperando a que la base de datos esté lista..."
npx wait-on tcp:postgres:5432
echo "Base de datos lista!"

if [ ! -f "$INIT_FLAG" ]; then
    echo "Primera inicialización de la base de datos..."

    echo "Ejecutando migraciones..."
    npx prisma migrate deploy

    echo "Generando cliente Prisma..."
    npx prisma generate

    echo "Ejecutando seed..."
    npx prisma db seed

    touch "$INIT_FLAG"
    echo "Inicialización completada"
else
    echo "La base de datos ya fue inicializada previamente"
fi

# Reemplaza el proceso actual con npm run dev
exec npm run dev
