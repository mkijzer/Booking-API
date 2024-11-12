import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateAmenityById = async (id, name, description) => {
  return prisma.amenity.update({
    where: { id },
    data: { name, description },
  });
};

export default updateAmenityById;
