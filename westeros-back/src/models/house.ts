import { House } from '../types/houseType';
import { prisma } from '../libs/prisma';

export const createHouse = async (house: House) => {

  const newHouse = await prisma.house.create({
    data: {
      name: house.name,
      imagePath: house.imagePath,
      description: house.description,
      cap: house.cap,
      balance: house.balance
    }
  });

  return newHouse;
};

export const getHouse = async (houseId: number) => {
  const house = await prisma.house.findFirst({
    where: {
      id: houseId
    }
  });
  return house;
};