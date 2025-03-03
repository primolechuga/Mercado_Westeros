import { hashPassword } from '../utils/hashPassword';
import { prisma } from '../libs/prisma';
import { houses } from './houses';
import { products } from './products';
import { createAuction } from '../models/auction';

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

  //consultar todas las casas
  const newHouses = await prisma.house.findMany();
  //consultar todos los productos
  const newsProducts = await prisma.product.findMany();



  const productStorages = [];
  for (const house of newHouses) {
    for (const product of newsProducts) {
      productStorages.push({
        houseId: house.id,
        productId: product.id,
        price: Math.floor(Math.random() * 100000) + 10, // Precio aleatorio entre 1 y 100
        stock: Math.floor(Math.random() * 100) + 10, // Stock aleatorio entre 1 y 100
      });
    }
  }

  await prisma.productStore.createMany({
    data: productStorages
  });


  //Creamos 15 subastas aleatorias
  const mercaderes = await prisma.user.findMany({
    where: {
      role: 'MERCADER'
    }
  });

  const subastas = [];

  for (let i = 0; i < 15; i++) {
    const mercader = mercaderes[i % mercaderes.length];
    const basePrice = Math.floor(Math.random() * 1000) + 1;
    const endDate = new Date();
    endDate.setFullYear(2025, 6, 1); 
    const quantity = Math.floor(Math.random() * 10) + 1;
    const productId = i + 1;
    const houseId = mercader.houseId;
    console.log(mercader.houseId);

    subastas.push({
      mercader,
      basePrice,
      endDate,
      quantity,
      productId
    });

    await createAuction( houseId, productId, basePrice, endDate, quantity, mercader.id);
  }



    





}


main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });