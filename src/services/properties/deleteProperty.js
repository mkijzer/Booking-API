import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteProperty = async (id) => {
  const deletedProperty = await prisma.property.deleteMany({
    where: { id },
  });

  if (!deletedProperty || deletedProperty.count === 0) {
    throw new Error(`Property with id ${id} not found`);
  }

  return id;
};

export default deleteProperty;
