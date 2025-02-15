import { hashPassword } from '../utils/hashPassword';
import { PrismaClient } from '@prisma/client';
import { houses } from './houses';
import { products } from './products';

const prisma = new PrismaClient();

async function main() {
  // Crear casas
  await prisma.house.createMany({
    data: houses
  });

  // Crear productos
  await prisma.product.createMany({
    data: products
  });


  // Crear usuarios

  await prisma.user.createMany({
    data: [
        
      //Mercaderes
      {
        email: 'JonSnow@westeros.com',
        name: 'Jon Snow',
        role: 'MERCADER',
        password: await hashPassword('123456'),
        houseId: 1,
      },
      {
        email: 'JuamBo@westeros.com',
        name: 'Juan Bolon Cho',
        role: 'MERCADER',
        password: await hashPassword('123456'),
        houseId: 2,
      },
      {
        email: 'CareCua@westeros.com',
        name: 'Carina Cuadrado',
        role: 'MERCADER',
        password: await hashPassword('123456'),
        houseId: 3,
      },
      {
        email: 'BolChe@westeros.com',
        name: 'Bolivar Chert',
        role: 'MERCADER',
        password: await hashPassword('123456'),
        houseId: 4,
      },

      //Maestres

      {
        email: 'TopLas@westeros.com',
        name: 'Topo Lass',
        role: 'MAESTRE',
        password: await hashPassword('123456'),
        houseId: 1,
      },
      {
        email: 'TracTor@westeros.com',
        name: 'Tracy Tor',
        role: 'MAESTRE',
        password: await hashPassword('123456'),
        houseId: 2,
      },
      {
        email: 'LaGo@westeros.com',
        name: 'Lagor Dann',
        role: 'MAESTRE',
        password: await hashPassword('123456'),
        houseId: 3,
      },
      {
        email: 'JeroFru@westeros.com',
        name: 'Jeronimo Frutiño',
        role: 'MAESTRE',
        password: await hashPassword('123456'),
        houseId: 4,
      },
    ]
  });




}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });