FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el archivo init.sh y dale permisos de ejecución
COPY ./src/scripts/init.sh /usr/src/app/src/scripts/init.sh
RUN chmod +x /usr/src/app/src/scripts/init.sh

# Convierte el archivo init.sh a formato Unix
RUN apk add --no-cache dos2unix && \
    dos2unix /usr/src/app/src/scripts/init.sh && \
    apk del dos2unix

# Copia el resto del código
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Expone el puerto
EXPOSE 4000

# Comando por defecto
CMD ["npm", "run", "dev"]