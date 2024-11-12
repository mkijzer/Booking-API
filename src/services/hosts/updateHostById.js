import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateHostById = async (id, updateData) => {
  const updatedHost = await prisma.host.update({
    where: { id },
    data: updateData,
  });

  if (!updatedHost) {
    throw new Error(`Host with id ${id} not found`);
  }

  return updatedHost;
};

export default updateHostById;
