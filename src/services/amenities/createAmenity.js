import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createAmenity = async (name, description) => {
  return prisma.amenity.create({
    data: { name, description },
  });
};

export default createAmenity;
