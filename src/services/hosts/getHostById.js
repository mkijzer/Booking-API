import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getHostById = async (id) => {
  return prisma.host.findUnique({
    where: {
      id,
    },
  });
};

export default getHostById;
