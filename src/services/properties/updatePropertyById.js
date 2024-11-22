import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updatePropertyById = async (id, newData) => {
  const existingProperty = await prisma.property.findUnique({
    where: { id },
  });

  if (!existingProperty) {
    throw new Error(`Property with id ${id} not found`);
  }

  return await prisma.property.update({
    where: { id },
    data: {
      ...existingProperty,
      ...newData,
    },
  });
};

export default updatePropertyById;
