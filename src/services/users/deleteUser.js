import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteUser = async (id) => {
  await prisma.booking.deleteMany({
    where: { userId: id },
  });

  await prisma.review.deleteMany({
    where: { userId: id },
  });

  const deletedUser = await prisma.user.delete({
    where: { id },
  });

  return deletedUser;
};

export default deleteUser;
