import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

export default getUserById;
