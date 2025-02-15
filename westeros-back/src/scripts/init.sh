#!/bin/sh


INIT_FLAG="/usr/src/app/.db-initialized"

# Función para esperar a que la base de datos esté lista
wait_for_db() {
    echo "Esperando a que la base de datos esté lista..."
    while ! nc -z postgres 5432; do
        sleep 1
    done
    echo "Base de datos lista!"
}

if [ ! -f "$INIT_FLAG" ]; then
    echo "Primera inicialización de la base de datos..."
    
    wait_for_db
    

    echo "Ejecutando migraciones..."
    npx prisma migrate deploy
    

    echo "Generando cliente Prisma..."
    npx prisma generate
    
    # Ejecutar el seed
    echo "Ejecutando seed..."
    npx prisma db seed
    
    # Crear el archivo flag
    touch "$INIT_FLAG"
    
    echo "Inicialización completada"
else
    echo "La base de datos ya fue inicializada previamente"
fi

npm run dev