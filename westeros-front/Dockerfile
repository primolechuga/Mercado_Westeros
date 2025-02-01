# Usa una imagen base oficial de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala las dependencias de forma eficiente
RUN npm ci

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]