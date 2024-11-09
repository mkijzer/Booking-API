import { PrismaClient } from "@prisma/client";

const deleteUser = async (id) => {
  const prisma = new PrismaClient();

  const deleteUser = await prisma.user.deleteMany({
    where: {
      id,
    },
  });

  // If no user is deleted, throw a proper error with a message
  if (!deleteUser || deleteUser.count === 0) {
    throw new Error(`User with id ${id} was not found`);
  }

  return id;
};

export default deleteUser;
