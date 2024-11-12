import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getPropertyById = async (id) => {
  return prisma.property.findUnique({
    where: {
      id,
    },
  });
};

export default getPropertyById;
